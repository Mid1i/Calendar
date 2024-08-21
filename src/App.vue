<script setup lang="ts">
	import { provide } from "vue";
	import type { TypeActions } from "@/types/TypeActions";
	import Calendar from "@/components/Calendar.vue";

	/**
	 * Текущий режим календаря.
	 * - "ONE_DATE": выбор одной даты.
	 * - "SEVERAL_DATES": выбор нескольких дат.
	 * - "ONE_PERIOD": выбор одного периода.
	 * - "SEVERAL_PERIODS: выбор нескольких периодов.
	 * 
	 * @type {TypeActions}
	 */
	const action: TypeActions = "ONE_PERIOD";

	provide("action", action);
</script>


<template>
	<div class="container">
		<Calendar/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.container {
		background: $--secondary-back;
		border-radius: 25px;

		align-items: center;
		display: flex;
		flex-direction: column;

		padding: 25px;
	}
</style>
