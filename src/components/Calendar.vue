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


	const getDays = computed(() => {
		let d = new Date(props.year, props.month);
		
		let days: IDay[] = [];
		let prevDays = 0;

		for (let i = 0; i < getDay(d); i++) {
			prevDays++;
		}
		
		for (let i = 0; i < prevDays; i++) {
			d.setDate(d.getDate() - prevDays + i);
			days.push({
				date: d.getDate(),
				isMuted: true
			})

			d = new Date(props.year, props.month);
		}

		while (d.getMonth() === props.month) {
			days.push({date:d.getDate()});
			d.setDate(d.getDate() + 1);
		}

		if (getDay(d) !== 0) {
			for (let i = getDay(d); i < 7; i++) {
				days.push({
					date: d.getDate(),
					isMuted: true
				})
				d.setDate(d.getDate() + 1);
			}
		}

		return days;
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
				v-for="(day, index) in getDays" 
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