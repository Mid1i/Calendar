<script setup lang="ts">
	import { computed, inject } from "vue";
	import type { TypeActions } from "@/types/TypeActions";
	import CalendarFooter from "@/components/CalendarFooter.vue";
	import CalendarHeader from "@/components/CalendarHeader.vue";
	import CalendarBody from "@/components/CalendarBody.vue";

	/**
		* Текущий режим календаря.
		*
		* @type {TypeActions}
		*/
	const currentAction: TypeActions = <TypeActions>inject("action");

	/**
	 * Вычисляемое свойство, которое создает заголовок календаря в зависимости от текущего режима.
	 * 
	 * @returns {string} Заголовок календаря.
	 */
	const getTitle = computed<string>(() => {
		const titles: Record<TypeActions, string> = {
			ONE_DATE: "Выберите дату формирования отчёта",
			SEVERAL_DATES: "Выберите даты формирования отчёта",
			ONE_PERIOD: "Выберите период формирования отчёта",
			SEVERAL_PERIODS: "Выберите периоды формирования отчёта"
		}

		return titles[currentAction];
	})
</script>


<template>
	<h1 class="title">{{ getTitle }}</h1>
	<div class="wrapper">
		<CalendarHeader/>
		<CalendarBody/>
		<CalendarFooter/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.title {
		font-size: 18px;
		font-weight: 400;

		margin-bottom: 30px;
	}

	.wrapper {
		width: calc($--cell * 7);	
	}
</style>