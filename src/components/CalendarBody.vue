<script setup lang="ts">
	import { computed, inject } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import { getDay, isInRange } from "@/helpers/calendar";
	import { isPeriodAction } from "@/helpers/global";


	/**
	 * Интерфейс объекта даты в календаре.
	 */
	interface IDay {
		/**
		 * Текущая дата.
		 * 
		 * @type {Date}
		 */
		date: Date,
		/**
		 * Пометка для стилизации дат предыдущего и следующего месяцев.
		 * 
		 * @type {boolean}
		 */
		isMuted: boolean
	}


	const props = defineProps<{
		/**
		 * Проверяет, является ли дата уже выбранной или нет.
		 * 
		 * @param {Date} date - Дата для проверки.
		 * @return {boolean} Возвращает true если дата уже выбрана; в противном случае - false. 
		 */
		isSelected: (date: Date) => boolean,
		/**
		 * Массив дат, выбранных пользователем.
		 * 
		 * @type {ISelectedDates[]}
		 */
		selectedDates: ISelectedDates[],
		/**
		 * Текущий месяц в виде числа (0-11).
		 * 
		 * @type {number}
		 */
		month: number,
		/**
		 * Текущий год.
		 * 
		 * @type {number}
		 */
		year: number
	}>();

	defineEmits<{
		/**
		 * Вызывается, когда пользователь выбирает дату.
		 * 
		 * @param {string} e - Название события, всегда "updateSelectedDates".
		 * @param {Date} date - Выбранная дата.
		 */
		(e: "updateSelectedDates", date: Date): void
	}>();

	/**
	 * Массив дней недели.
	 * 
	 * @type {string[]}
	 */
	const days: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

	/**
		* Текущий режим календаря.
		*
		* @type {TypeActions}
		*/
	const currentAction: TypeActions = <TypeActions>inject("action");

	/**
	 * Вычисляемое свойство, заполняющее массив дат, соответствующих текущему месяцу.
	 * - Массив включает несколько дат из предыдущего и следующего месяцев.
	 * - Даты предыдущего и следующего месяцев помечены "isMuted".
	 * 
	 * @returns {IDay[]} Массив объектов IDay, представляющих все даты, которые должны быть показаны в календаре для текущего месяца.
	 */
	const getMonthDates = computed<IDay[]>(() => {
		let date: Date = new Date(props.year, props.month);
		let monthDates: IDay[] = [];
		
		const firstDayOfMonth: number = getDay(date);
		
		date.setDate(date.getDate() - firstDayOfMonth);

		const previousMonthCondition = (): boolean => monthDates.length < firstDayOfMonth;
		const currentMonthCondition = (): boolean => date.getMonth() === props.month;
		const nextMonthCondition = (): boolean => getDay(date) !== 0 && getDay(date) < 7;
		
		while (previousMonthCondition() || currentMonthCondition() || nextMonthCondition()) {
			monthDates.push({
				date: new Date(date),
				isMuted: !currentMonthCondition()
			});
			
			date.setDate(date.getDate() + 1);
		}
		
		return monthDates;
	});
</script>


<template>
	<div class="calendar">
		<span 
			v-for="day in days"
			:key="day"
			class="calendar__header"
		>
			{{ day }}
		</span>
		<span
			v-for="{ date, isMuted }, index) in getMonthDates"
			:key="index"
			:class="[
				'calendar__item',
				isPeriodAction(currentAction) && isInRange(date, selectedDates),
			]"
		>
			<span 
				@click="() => $emit('updateSelectedDates',date)"
				@keydown.enter="() => $emit('updateSelectedDates', date)"
				:class="[
					'calendar__item-button',
					isMuted && 'muted',
					isSelected(date) && 'selected'
				]"
				tabindex="0"
			>
				{{ date.getDate() }}
			</span>
		</span>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.calendar {
		display: grid;
		grid-template-columns: repeat(7, $--cell);

		margin-bottom: 20px;

		&__header {
			align-items: center;
			display: flex;
			justify-content: center;

			color: $--primary-text;
			font-weight: 600;

			height: $--cell;
			width: $--cell;
		}

		&__item {
			padding: 5px;
			position: relative;

			height: $--cell;
			width: $--cell;

			&::before {
				content: "";

				position: absolute;
				left: 0px;
				top: 5px;

				height: calc(100% - 10px);
				width: calc(100% - 5px);
				z-index: 0;
			}

			&.from::before {
				background: $--dark-blue;
				left: 5px;
			}

			&.between::before {
				background: $--dark-blue;
				width: 100%;
			}

			&.to::before {
				background: $--dark-blue;
			}

			&-button {
				align-items: center;
				display: flex;
				justify-content: center;

				border-radius: 5px;

				color: $--primary-text;
				cursor: pointer;
				font-size: 16px;

				position: relative;

				transition: background 0.1s ease-in-out;
				height: 100%;
				width: 100%;
				z-index: 1;

				&:focus {
					background: $--tertiary-back;
				}
	
				&.muted {
					color: $--secondary-text;
				}

				&.selected {
					background: $--blue;
					color: $--primary-text;

					&:focus {
						background: lighten(#0A84FF, 10%);
					}
				}
			}
		}
	}


	@keyframes fillBackground {
		0% {
			background: transparent;
		}
		100% {
			background: $--dark-blue;
		}
	}


	@media(hover: hover) {
		.calendar__item-button:hover {
			background: $--tertiary-back;
		}

		.calendar__item-button.selected:hover {
			background: lighten(#0A84FF, 10%);
		}
	}
</style>