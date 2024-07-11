<script setup lang="ts">
	import { provide } from "vue";
	import type { TypeActions } from "./interfaces/IDay";
	import Calendar from "@/components/Calendar.vue";


	const action: TypeActions = "oneDate";

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
		align-items: flex-start;
		display: flex;
		flex-direction: column;

		padding: 25px;

		height: 100%;
		width: 100%;
	}
</style>
