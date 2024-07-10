<script setup lang="ts">
	import { computed } from "vue";
	import { getDay } from "@/helpers/calendar";


	interface IDay {
		date: number,
		isMuted?: boolean
	}


	const props = defineProps<{
		month: number,
		year: number
	}>();

	const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];


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
				date: date.getDate(),
				isMuted: !currentMonthCondition()
			});

			date.setDate(date.getDate() + 1);
		}

		return monthDates;
	});
</script>


<template>
	<div class="calendar">
		<div class="calendar__body">
			<span 
				v-for="day in WEEK_DAYS"
				:key="day"
				class="calendar__body-header"
			>
				{{ day }}
			</span>
			<span 
				v-for="(day, index) in getMonthDates" 
				:key="index"
				:class="['calendar__body-item', day.isMuted && 'muted']"
			>
				{{ day.date }}
			</span>
		</div>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.calendar {
		display: flex;
		flex-direction: column;

		&__body {
			font-size: 16px;

			display: grid;
			grid-template-columns: repeat(7, $--cell);

			&-item, &-header {
				align-items: center;
				display: flex;
				justify-content: center;

				height: $--cell;

				&.muted {
					color: $--secondary-text;
				}
			}

			&-header {
				font-weight: 600;
			}
		}
	}
</style>