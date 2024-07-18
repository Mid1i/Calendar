<script setup lang="ts">
	import { inject, computed } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import { getFullDate } from "@/helpers/calendar";
	import { getWordByAmount } from "@/helpers/words";
	import { isPeriodAction } from "@/helpers/global";


	const props = defineProps<{
		selectedDates: ISelectedDates[]
	}>();


	const currentAction = <TypeActions>inject("action");


	const getTitle = computed<string>(() => {
		const length: number = isPeriodAction(currentAction) ? props.selectedDates.filter((item) => item.from && item?.to).length : props.selectedDates.length;
		const isSingle: boolean = length === 1;
		
		if (length === 0) return "";

		const titles: Record<TypeActions, () => string> = {
			ONE_DATE: () => "Выбранная дата:",
			SEVERAL_DATES: () => isSingle ? "Выбранная дата:" : `Выбраны ${length} ${getWordByAmount(length, "дата", "даты", "дат")}:`,
			ONE_PERIOD: () => "Выбранный период:",
			SEVERAL_PERIODS: () => `Выбраны ${length} ${getWordByAmount(length, "период", "периода", "периодов")}:`
		};

		return titles[currentAction]();
	});


	const getSelectedDate = (date: ISelectedDates): string => {
		if (!isPeriodAction(currentAction)) return getFullDate(date.from);

		if (date?.to) {
			const periodLength = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			return `${getFullDate(date.from)}-${getFullDate(date.to)} (${periodLength} ${getWordByAmount(periodLength, "день", "дня", "дней")})`;
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
				:class="['footer__list-el', isPeriodAction(currentAction) && 'period']"
			>
				{{ `${getSelectedDate(date)}${index === selectedDates.length - 1 ? "" : ","}` }}
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
			gap: 5px;

			&-title {
				font-size: 18px;
				font-weight: 500;
			}

			&-el {
				font-size: 16px;
				width: 85px;

				&.period {
					width: 250px;
				}
			}
		}
	}
</style>