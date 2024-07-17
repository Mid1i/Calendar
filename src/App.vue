<script setup lang="ts">
	import { provide } from "vue";
	import type { TypeActions } from "./interfaces/IDay";
	import Calendar from "@/components/Calendar.vue";


	const action: TypeActions = "severalPeriods";

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
