<script setup lang="ts">
	import { inject, computed } from "vue";
	import type { ISelectedDates } from "@/interfaces/ISelectedDates";
	import type { TypeActions } from "@/types/TypeActions";
	import { getFullDate } from "@/helpers/calendar";
	import { getWordByAmount } from "@/helpers/words";


	const props = defineProps<{
		selectedDates: ISelectedDates[]
	}>();


	const currentAction = <TypeActions>inject("action");


	const getTitle = computed<string>(() => {
		const length = props.selectedDates.length;
		const isSingle = length === 1;

		if (length === 0) return "";

		if (currentAction === "ONE_DATE" || (currentAction === "SEVERAL_DATES" && isSingle)) return "Выбранная дата:";
		
		if (currentAction === "SEVERAL_DATES") return `Выбраны ${length} ${getWordByAmount(length, "дата", "даты", "дат")}:`;
		
		if (currentAction === "ONE_PERIOD" || (currentAction === "SEVERAL_PERIODS" && isSingle)) return "Выбранный период:";

		return `Выбраны ${length} ${getWordByAmount(length, "период", "периода", "периодов")}:`;		
	});


	const getDate = (date: ISelectedDates): string => {
		if (currentAction === "ONE_DATE" || currentAction === "SEVERAL_DATES") return getFullDate(date.from);

		if (date.to) {
			const periodLength = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			return `${getFullDate(date.from)}-${getFullDate(date.to)} (${periodLength} ${getWordByAmount(periodLength, "день", "дня", "дней")})`;
		}

		return "";
	}
</script>


<template>
	<footer class="footer">
		<h2 class="footer__title">{{ getTitle }}</h2>
		<!-- <h2 class="footer__title">Выбраны 2 даты:</h2> -->
		<ul class="footer__list">
			<li 
				v-for="(date, index) in selectedDates"
				:key="index"
				class="footer__list-el"
			>
				{{ `${getDate(date)}${index === selectedDates.length - 1 ? "" : ","}` }}
			</li>
			<!-- <li class="footer__list-el">12.06.2024,</li>
			<li class="footer__list-el">12.06.2024</li>
			<li class="footer__list-el">12.06.2024</li>
			<li class="footer__list-el">12.06.2024</li>
			<li class="footer__list-el">12.06.2024</li> -->
		</ul>
	</footer>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.footer {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: 5px;

		&__title {
			font-size: 18px;
			font-weight: 500;
		}

		&__list {
			align-items: center;
			display: flex;
			flex-wrap: wrap;
			gap: 5px;

			&-el {
				font-size: 16px;
			}
		}
	}
</style>