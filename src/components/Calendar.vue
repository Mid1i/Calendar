<script setup lang="ts">
	import { computed, ref, inject } from "vue";
	import type { TypeActions } from "@/interfaces/IDay";
	import CalendarHeader from "@/components/CalendarHeader.vue";
	import CalendarBody from "@/components/CalendarBody.vue";
	// import CalendarFooter from "@/components/CalendarFooter.vue";


	const action = <TypeActions>inject("action");

	const currentDate = new Date();

	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());

	const selectedDates = ref<string[]>([]);


	const getTitle = computed<string>(() => {
		const titles: Record<string, string> = {
			oneDate: "Выберите дату формирования отчёта",
			severalDates: "Выберите даты формирования отчёта",
			onePeriod: "Выберите период формирования отчёта",
			severalPeriods: "Выберите периоды формирования отчёта"
		}

		return titles[action];
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
		if (action === "oneDate") {
			selectedDates.value = selectedDates.value[0] === date ? [] : [date];
		}

		if (action === "severalDates") {
			isSelected(date) ? selectedDates.value = [...selectedDates.value.filter(item => item !== date)] : selectedDates.value.push(date);
		}

		if (action === "onePeriod") {
			selectedDates.value.length === 2 ? selectedDates.value = [] : selectedDates.value.push(date);
		}
	}

	const isSelected = (date: string): boolean => !!selectedDates.value.find(item => item === date);
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
			:month="currentMonth"
			:year="currentYear"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.title {
		font-size: 32px;
		margin-bottom: 30px;
	}

	.wrapper {
		width: calc($--cell * 7);	
	}
</style>