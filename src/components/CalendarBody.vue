<script setup lang="ts">
	import { computed, inject } from "vue";
	import type { TypeActions, ISelectedDates } from "@/interfaces/IDay";
	import { convertDateToString } from "@/helpers/converters";
	import { getDay, isInRange } from "@/helpers/calendar";


	interface IDay {
		date: string,
		isMuted: boolean
	}


	const props = defineProps<{
		isSelected: (date: string) => boolean,
		selectedDates: ISelectedDates[],
		month: number,
		year: number
	}>();

	defineEmits<{
		(e: "updateSelectedDates", date: string): void
	}>();


	const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

	const currentAction = <TypeActions>inject("action");


	const getMonthDates = computed(() => {
		let date = new Date(props.year, props.month);
		let monthDates: IDay[] = [];
		const firstDayOfMonth = getDay(date);
		
		date.setDate(date.getDate() - firstDayOfMonth);

		const previousMonthCondition = (): boolean => monthDates.length < firstDayOfMonth;
		const currentMonthCondition = (): boolean => date.getMonth() === props.month;
		const nextMonthCondition = (): boolean => getDay(date) !== 0 && getDay(date) < 7;
		
		while (previousMonthCondition() || currentMonthCondition() || nextMonthCondition()) {
			monthDates.push({
				date: convertDateToString(date),
				isMuted: !currentMonthCondition()
			});
			
			date.setDate(date.getDate() + 1);
		}
		
		return monthDates;
	});
</script>


<template>
	<table class="calendar">
		<tr class="calendar__row">
			<th 
				v-for="day in days"
				:key="day"
				class="calendar__header"
			>
				{{ day }}
			</th>
		</tr>
		<tr
			v-for="num in 6"
			:key="num" 
			class="calendar__row"
		>
			<td
				v-for="{ date, isMuted }, index) in getMonthDates.slice((num - 1) * 7, num * 7)"
				:key="index"
				:class="[
					'calendar__item',
					(!isMuted && ['severalPeriods', 'onePeriod'].includes(currentAction)) && isInRange(date, selectedDates)
				]"
			>
				<div
					@click="() => !isMuted && $emit('updateSelectedDates', date)"
					@keydown.enter="() => !isMuted && $emit('updateSelectedDates', date)"
					:class="[
						'calendar__item-button',
						isMuted && 'muted', 
						isSelected(date) && 'selected'
					]"
					tabindex="0"
				>
					{{ date.split(".")[1] }}
				</div>
			</td>
		</tr>
	</table>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";

	.calendar {
		border-collapse: collapse;
		width: 100%;

		&__header {
			font-weight: 600;

			padding: 5px;
			height: $--cell;
			width: $--cell;
		}

		&__item {
			padding: 5px;
			position: relative;

			height: $--cell;

			&::before {
				content: "";

				position: absolute;
				left: 0px;
				top: 5px;

				// transition: all 0.1s ease-in-out;
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
				border-radius: 5px;

				align-items: center;
				display: flex;
				justify-content: center;

				color: $--primary-text;
				cursor: pointer;
				font-size: 16px;

				position: relative;

				transition: background 0.1s ease-in-out;
				height: 100%;
				width: 100%;
				z-index: 1;

				&.selected {
					background: $--blue;
				}
	
				&.muted {
					color: $--secondary-text;
					pointer-events: none;
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
		.calendar__item-button:hover,
		.calendar__item-button:focus {
			background: $--tertiary-back;
		}

		.calendar__item-button.selected:hover,
		.calendar__item-button.selected:focus {
			background: lighten(#0A84FF, 10%);
		}

		.calendar__item-button.muted:hover,
		.calendar__item-button.muted:focus {
			background: transparent;
		}
	}
</style>