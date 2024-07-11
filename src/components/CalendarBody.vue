<script setup lang="ts">
	import { computed } from "vue";
	import type { IDay } from "@/interfaces/IDay";
	import { getDay, dateToString } from "@/helpers/calendar";


	const props = defineProps<{
		isSelected: (date: string) => boolean,
		month: number,
		year: number
	}>();

	defineEmits<{
		(e: "updateSelectedDates", date: string): void
	}>();

	const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];


	const getMonthDates = computed(() => {
		let date = new Date(props.year, props.month);
		let currentDate = new Date();
		let monthDates: IDay[] = [];
		const firstDayOfMonth = getDay(date);
		
		date.setDate(date.getDate() - firstDayOfMonth);

		const previousMonthCondition = (): boolean => monthDates.length < firstDayOfMonth;
		const currentMonthCondition = (): boolean => date.getMonth() === props.month;
		const nextMonthCondition = (): boolean => getDay(date) !== 0 && getDay(date) < 7;
		
		while (previousMonthCondition() || currentMonthCondition() || nextMonthCondition()) {
			monthDates.push({
				date: dateToString(date),
				isMuted: !currentMonthCondition(),
				isToday:dateToString(date) === dateToString(currentDate),
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
				v-for="{ date, isMuted, isToday }, index) in getMonthDates.slice((num - 1) * 7, num * 7)"
				:key="index"
				:class="['calendar__item']"
			>
				<div
					@click="() => !isMuted && $emit('updateSelectedDates', date)"
					@keydown.enter="() => !isMuted && $emit('updateSelectedDates', date)"
					:class="[
						'calendar__item-button', 
						isMuted && 'muted', 
						isToday && 'today', 
						isSelected(date) && 'selected'
					]"
					tabindex="0"
				>
					{{ date.split(".")[0] }}
		</div>
			</td>
		</tr>
	</table>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";

	.calendar {
		width: 100%;

		&__header {
			font-weight: 600;

			padding: 5px;
			height: $--cell;
		}

		&__item {
			padding: 5px;
			height: $--cell;

			&-button {
				align-items: center;
				display: flex;
				justify-content: center;
				
				border-radius: 100%;

				color: $--primary-text;
				font-size: 16px;

				transition: all 0.1s ease-in-out;
				height: 100%;
				width: 100%;
	
				&.today {
					color: $--blue;
				}
	
				&.selected {
					background: $--blue;
					color: $--primary-text;
				}

				&.muted {
					background: transparent;
					
					color: $--secondary-text;
					pointer-events: none;
				}
			}

		}
	}


	@media(hover: hover) {
		.calendar__item-button:hover,
		.calendar__item-button:focus {
			background: $--tertiary-back;
		}

		.calendar__item-button.selected:hover,
		.calendar__item-button.selected:focus {
			background: lighten(#0A84FF, 5%);
		}

		.calendar__item-button.muted:focus {
			background: transparent;
		}
	}
</style>