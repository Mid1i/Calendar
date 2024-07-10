<script setup lang="ts">
	import { ref } from "vue";
	import Calendar from "@/components/Calendar.vue";
	import CurrentDate from "@/components/CurrentDate.vue";


	const currentDate: Date = new Date();

	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());


	const changeMonth = (isPrevious?: boolean): void => {
		if (isPrevious) {
        currentMonth.value = (currentMonth.value + 11) % 12;
        if (currentMonth.value === 11) currentYear.value--;
    } else {
        currentMonth.value = (currentMonth.value + 1) % 12;
        if (currentMonth.value === 0) currentYear.value++;
    }
	}
</script>


<template>
	<div class="container">
		<CurrentDate
			@changeMonth="changeMonth"
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
