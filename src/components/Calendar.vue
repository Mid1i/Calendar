<script setup lang="ts">
	import { computed, ref, inject } from "vue";
	import type { TypeActions, ISelectedDates } from "@/interfaces/IDay";
	import CalendarHeader from "@/components/CalendarHeader.vue";
	import CalendarFooter from "@/components/CalendarFooter.vue";
	import CalendarBody from "@/components/CalendarBody.vue";
	import { convertStringToDate } from "@/helpers/converters";
	import { compareDates } from "@/helpers/calendar";
	import { getLastElement } from "@/helpers/global";


	const currentAction = <TypeActions>inject("action");

	const currentDate = new Date();

	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());

	const selectedDates = ref<ISelectedDates[]>([]);


	const getTitle = computed<string>(() => {
		const titles: Record<string, string> = {
			oneDate: "Выберите дату формирования отчёта",
			severalDates: "Выберите даты формирования отчёта",
			onePeriod: "Выберите период формирования отчёта",
			severalPeriods: "Выберите периоды формирования отчёта"
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


	const updateSelectedDates = (date: string): void => {
		const currentDate = convertStringToDate(date);
		const lastElement = getLastElement(selectedDates.value);

		const isOneDateAction = currentAction === "oneDate";
		const isSeveralDatesAction = currentAction === "severalDates";
		const isOnePeriodAction = currentAction === "onePeriod";

		if (isOneDateAction || isSeveralDatesAction) {
			selectedDates.value = isSelected(date) 
				? selectedDates.value.filter(item => item?.from !== date) 
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
					const fromDate = convertStringToDate(item.from);
					const toDate = convertStringToDate(item.to);
	
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
	

	const isSelected = (date: string): boolean => !!selectedDates.value.find(item => item.from === date || item?.to === date);
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