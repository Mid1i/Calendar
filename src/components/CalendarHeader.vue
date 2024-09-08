<script setup lang="ts">
	import BaseButton from "@/components/BaseButton.vue";
	import { convertNumberToMonth } from "@/helpers/converters";
	import { useCalendarStore } from "@/store/calendar";


	const store = useCalendarStore();
</script>


<template>
	<header class="header">
		<BaseButton @click="() => store.changeMonth(true)" isPrevious/>
		<h1 class="header__title">{{ `${convertNumberToMonth(store.currentMonth)}, ${store.currentYear}` }}</h1>
		<BaseButton @click="() => store.changeMonth()"/>
	</header>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;

		margin-bottom: 15px;
		width: 100%;

		&__title {
			font-size: 20px;
			font-weight: 400;
		}
	}
</style>