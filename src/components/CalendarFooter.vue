<script setup lang="ts">
	import { inject, computed } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import { getFullDate } from "@/helpers/calendar";
	import { getWordByAmount } from "@/helpers/words";
	import { isPeriodAction } from "@/helpers/global";


	const props = defineProps<{
		/**
		 * Массив выбранных пользователем дат.
		 * 
		 * @type {ISelectedDates[]}
		 */
		selectedDates: ISelectedDates[]
	}>();

	/**
		* Текущий режим календаря.
		*
		* @type {TypeActions}
		*/
	const currentAction: TypeActions = <TypeActions>inject("action");

	/**
	 * Вычисляемое свойство, которое создает заголовок в зависимости от текущего режима и выбранных дат.
	 * 
	 * @returns {string} Заголовок календаря.
	 */
	const getTitle = computed<string>(() => {
		const length: number = isPeriodAction(currentAction) ? getPeriodDatesLength.value : props.selectedDates.length;
		const isSingle: boolean = length === 1;
		console.log(isPeriodAction(currentAction) ?  getPeriodDatesLength.value - 1 : props.selectedDates.length - 1)
		
		if (length === 0) return "";

		const titles: Record<TypeActions, string> = {
			ONE_DATE: "Выбранная дата:",
			SEVERAL_DATES: isSingle ? "Выбранная дата:" : `Выбраны ${length} ${getWordByAmount(length, "дата", "даты", "дат")}:`,
			ONE_PERIOD: "Выбранный период:",
			SEVERAL_PERIODS: `Выбраны ${length} ${getWordByAmount(length, "период", "периода", "периодов")}:`
		};

		return titles[currentAction];
	});

	/**
	 * Вычисляемое свойство, которое получает количество выбранных дат/периодов.
	 * 
	 * @returns {number} Число выбранных дат/периодов.
	 */
	const getPeriodDatesLength = computed<number>(() => props.selectedDates.filter(item => item.from && item?.to).length);

	/**
	 * Получение строкового представления выбранных пользователем дат.
	 * 
	 * @param {ISelectedDate} date - Выбранная дата. 
	 * @param {number} index - Индекс текущей даты в массиве "selectedDates". 
	 * 
	 * @returns {string} Возвращает строковое представление выбранных дат. 
	 * - Если режим не является периодом: "01.01.2024, 02.01.2024, ..."
	 * - Если режим является периодом: "01.01.2024-05.01.2024 (5 дней), ..."  
	 */
	const getSelectedDate = (date: ISelectedDates, index: number): string => {
		if (!isPeriodAction(currentAction)) return `${getFullDate(date.from)}${index === props.selectedDates.length - 1 ? "" : ", "}`;
		
		if (date?.to) {
			const periodLength: number = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			const getComma: string = index === getPeriodDatesLength.value - 1 ? "" : ", ";
			return `${getFullDate(date.from)}-${getFullDate(date.to)} (${periodLength} ${getWordByAmount(periodLength, "день", "дня", "дней")})${getComma}`;
		}

		return "";
	}
</script>


<template>
	<footer class="footer">
		<ul class="footer__list">
			<li class="footer__list-title">{{ getTitle }}</li>
			<li 
				v-for="(date, index) in selectedDates"
				:key="index"
				:class="[
					'footer__list-el', 
					isPeriodAction(currentAction) && 'period'
				]"
			>
				{{ getSelectedDate(date, index) }}
			</li>
		</ul>
	</footer>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.footer {

		&__list {
			align-items: center;
			display: flex;
			flex-wrap: wrap;

			&-title {
				font-size: 18px;
				font-weight: 500;

				margin-right: 10px;
			}

			&-el {
				font-size: 16px;

				margin-right: 5px;
				width: 85px;

				&.period {
					width: 260px;
				}
			}
		}
	}
</style>