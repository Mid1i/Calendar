<script setup lang="ts">
	import { computed, inject, ref, watch } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import CalendarFooter from "@/components/CalendarFooter.vue";
	import CalendarHeader from "@/components/CalendarHeader.vue";
	import CalendarBody from "@/components/CalendarBody.vue";
	import { compareDates } from "@/helpers/calendar";
	import { getLastElement } from "@/helpers/global";


	const currentAction = <TypeActions>inject("action");

	const currentDate = new Date();

	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());

	const selectedDates = ref<ISelectedDates[]>([]);


	const getTitle = computed<string>(() => {
		const titles: Record<TypeActions, string> = {
			ONE_DATE: "Выберите дату формирования отчёта",
			SEVERAL_DATES: "Выберите даты формирования отчёта",
			ONE_PERIOD: "Выберите период формирования отчёта",
			SEVERAL_PERIODS: "Выберите периоды формирования отчёта"
		}

		return titles[currentAction];
	})


	const changeMonth = (isPrevious?: boolean): void => {
		if (isPrevious) {
        currentMonth.value = (currentMonth.value + 11) % 12;
        if (currentMonth.value === 11) currentYear.value--;
    } else {
        currentMonth.value = (currentMonth.value + 1) % 12;
        if (currentMonth.value === 0) currentYear.value++;
    }
	}

	const updateSelectedDates = (date: Date): void => {
		const currentDate = date.getTime();
		const lastElement = getLastElement(selectedDates.value);

		const isOneDateAction = currentAction === "ONE_DATE";
		const isSeveralDatesAction = currentAction === "SEVERAL_DATES";
		const isOnePeriodAction = currentAction === "ONE_PERIOD";

		if (isOneDateAction || isSeveralDatesAction) {
			selectedDates.value = isSelected(date) 
				? selectedDates.value.filter(item => item?.from.getTime() !== currentDate) 
				: [...(isOneDateAction ? [] : selectedDates.value), { from: date }];

			return;
		}

		if (date === lastElement?.from) {
			selectedDates.value = selectedDates.value.slice(0, -1);
			return;
		}

		if (lastElement?.to) {
			for (let item of selectedDates.value) {
				if (item.from && item?.to) {
					const fromDate = item.from.getTime();
					const toDate = item.to.getTime();
	
					if (fromDate <= currentDate && currentDate <= toDate) {
						selectedDates.value = selectedDates.value.filter(value => value !== item);
						return;
					}
				}
			}
		}

		if (selectedDates.value.length === 0 || lastElement?.to) {
			selectedDates.value = [...selectedDates.value, { from: date }];
			return;
		}

		selectedDates.value = [...(isOnePeriodAction ? [] : selectedDates.value.slice(0, -1)), compareDates(date, lastElement)];
	}
	

	const isSelected = (date: Date): boolean => !!selectedDates.value.find(item => item.from.getTime() === date.getTime() || item?.to?.getTime() === date.getTime());

	watch(selectedDates, () => console.log(selectedDates.value))
</script>


<template>
	<h1 class="title">{{ getTitle }}</h1>
	<div class="wrapper">
		<CalendarHeader
			@change-month="changeMonth"
			:month="currentMonth"
			:year="currentYear"
		/>
		<CalendarBody
			@update-selected-dates="updateSelectedDates"
			:is-selected="isSelected"
			:selectedDates="selectedDates"
			:month="currentMonth"
			:year="currentYear"
		/>
		<CalendarFooter
			:selectedDates="selectedDates"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.title {
		font-size: 18px;
		font-weight: 400;

		margin-bottom: 30px;
	}

	.wrapper {
		width: calc($--cell * 7);	
	}
</style>