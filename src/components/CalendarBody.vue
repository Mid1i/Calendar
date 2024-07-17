<script setup lang="ts">
	import { computed, inject } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import { getDay, isInRange } from "@/helpers/calendar";


	interface IDay {
		date: Date,
		isMuted: boolean
	}


	const props = defineProps<{
		isSelected: (date: Date) => boolean,
		selectedDates: ISelectedDates[],
		month: number,
		year: number
	}>();

	defineEmits<{
		(e: "updateSelectedDates", date: Date): void
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
				(!isMuted && (currentAction === 'SEVERAL_PERIODS' || currentAction === 'ONE_PERIOD')) && isInRange(date, selectedDates),
			]"
		>
			<span 
				@click="() => !isMuted && $emit('updateSelectedDates',date)"
				@keydown.enter="() => !isMuted && $emit('updateSelectedDates', date)"
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