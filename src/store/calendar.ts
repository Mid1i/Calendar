import type { ISelectedDates } from "@/interfaces/ISelectedDates";
import type { TypeActions } from "@/types/TypeActions";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { compareDates } from "@/helpers/calendar";


export const useCalendarStore = defineStore("calendar", () => {
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
	const updateSelectedDates = (date: Date, currentAction: TypeActions): void => {
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

	
	return {
		/**
		 * Текущий месяц в виде числа (0-11).
		 * 0 - Январь, 11 - Декабрь.
		 * 
		 * @type {number}
		 */
		currentMonth,
		/**
		 * Текущий год.
		 * 
		 * @type {number}
		 */
		currentYear,
		/**
		 * Массив выбранных пользователем дат.
		 * 
		 * @type {ISelectedDates[]}
		 */
		selectedDates,
		updateSelectedDates,
		changeMonth,
		isSelected
	}
});