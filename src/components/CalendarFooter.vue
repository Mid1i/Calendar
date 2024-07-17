<script setup lang="ts">
	import { inject, computed } from "vue";
	import type { ISelectedDates, TypeActions } from "@/interfaces/IDay";
	import { getWordByAmount } from "@/helpers/words";


	const props = defineProps<{
		selectedDates: ISelectedDates[]
	}>();


	const currentAction = <TypeActions>inject("action");

	const getTitle = computed<string>(() => {
		const length = props.selectedDates.length;
		const isSingle = length === 1;

		if (currentAction === "oneDate" || (currentAction === "severalDates" && isSingle)) return "Выбранная дата:";
		
		if (currentAction === "severalDates") return `${length} ${getWordByAmount(length, "дата", "даты", "дат")}:`;
		
		if (currentAction === "onePeriod" || (currentAction === "severalPeriods" && isSingle)) return "Выбранный период:";

		return `${length} ${getWordByAmount(length, "период", "периода", "периодов")}:`;		
	});

	const getDate = (date: string): string => {
		// const formattes = {
		// 	oneDate: 
		// }
	}
</script>


<template>
	<footer class="footer">
		<h2 class="footer__title">{{ getTitle }}</h2>
		<ul class="footer__list">
			<li 
				v-for="(date, index) in selectedDates"
				:key="index"
				class="footer__list-el"
			>
				{{ getDate(date) }}
			</li>
		</ul>
	</footer>
</template>


<style scoped lang="scss">

</style>