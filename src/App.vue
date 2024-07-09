<script setup lang="ts">
	import { ref } from "vue";
	import Calendar from "@/components/Calendar.vue";
	import CurrentDate from "@/components/CurrentDate.vue";


	const currentDate: Date = new Date();

	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());

	const setMonth = (isPrevious?: boolean) => {
		if (isPrevious) {
			currentMonth.value = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
		} else {
			currentMonth.value = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
		}
	}
</script>


<template>
	<div class="container">
		<CurrentDate
			@changeMonth="setMonth"
			:month="currentMonth"
			:year="currentYear"
		/>
		<Calendar
			:month="currentMonth"
			:year="currentYear"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.container {
		background: $--secondary-back;
		border-radius: 25px;

		display: flex;
		flex-direction: column;

		margin: 0px auto;
		padding: 25px;

		width: calc(7 * $--cell + 50px);
	}
</style>
