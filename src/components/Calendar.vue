<script setup lang="ts">
	import { Ref, computed, inject, ref } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import CalendarFooter from "@/components/CalendarFooter.vue";
	import CalendarHeader from "@/components/CalendarHeader.vue";
	import CalendarBody from "@/components/CalendarBody.vue";
	import { compareDates } from "@/helpers/calendar";


	/**
		* Текущий режим календаря.
		*
		* @type {TypeActions}
		*/
	const currentAction: TypeActions = <TypeActions>inject("action");

	/**
	 * Текущая дата.
	 * 
	 * @type {Date}
	 */
	const currentDate: Date = new Date();

	/**
	 * Текущий год.
	 * 
	 * @type {Ref<number>}
	 */
	const currentYear: Ref<number> = ref(currentDate.getFullYear());

	/**
	 * Текущий месяц в виде числа (0-11).
	 * 0 - Январь, 11 - Декабрь.
	 * 
	 * @type {Ref<number>}
	 */
	const currentMonth: Ref<number> = ref(currentDate.getMonth());

	/**
	 * Массив выбранных пользователем дат.
	 * 
	 * @type {Ref<ISelectedDates[]>}
	 */
	const selectedDates: Ref<ISelectedDates[]> = ref([]);

	/**
	 * Вычисляемое свойство, которое создает заголовок календаря в зависимости от текущего режима.
	 * 
	 * @returns {string} Заголовок календаря.
	 */
	const getTitle = computed<string>(() => {
		const titles: Record<TypeActions, string> = {
			ONE_DATE: "Выберите дату формирования отчёта",
			SEVERAL_DATES: "Выберите даты формирования отчёта",
			ONE_PERIOD: "Выберите период формирования отчёта",
			SEVERAL_PERIODS: "Выберите периоды формирования отчёта"
		}

		return titles[currentAction];
	})

	/**
	 * Меняет месяц в зависимости от направления.
	 * 
	 * @param {boolean} isPrevious - Если true, меняет на предыдущий месяц; в противном случае, меняет на следующий.
	 * @returns {void}
	 */
	const changeMonth = (isPrevious?: boolean): void => {
		if (isPrevious) {
        currentMonth.value = (currentMonth.value + 11) % 12;
        if (currentMonth.value === 11) currentYear.value--;
    } else {
        currentMonth.value = (currentMonth.value + 1) % 12;
        if (currentMonth.value === 0) currentYear.value++;
    }
	}

	/**
	 * Обновление выбранных пользователем дат, в зависимости от режима календаря.
	 * - Если дата уже выбрана, она удаляется из массива; иначе, добавляется.
	 * 
	 * @param {Date} date - Выбранная дата.
	 * @returns {void}
	 */
	const updateSelectedDates = (date: Date): void => {
		const currentDate: number = date.getTime();
		const lastElement: ISelectedDates | undefined = selectedDates.value[selectedDates.value.length - 1];

		const isOneDateAction: boolean = currentAction === "ONE_DATE";
		const isSeveralDatesAction: boolean = currentAction === "SEVERAL_DATES";
		const isOnePeriodAction: boolean = currentAction === "ONE_PERIOD";


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
					const fromDate: number = item.from.getTime();
					const toDate: number = item.to.getTime();
	
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
	
	/**
	 * Проверяет, выбрана ли уже дата.
	 * 
	 * @param {Date} date - Дата для проверки.
	 * @returns {boolean} True, если дата выбрана; в противном случае - false. 
	 */
	const isSelected = (date: Date): boolean => !!selectedDates.value.find(item => item.from.getTime() === date.getTime() || item?.to?.getTime() === date.getTime());
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