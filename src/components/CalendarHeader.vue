<script setup lang="ts">
	import { getMonth } from "@/helpers/calendar";
	import BaseButton from "@/components/BaseButton.vue";


	defineProps<{
		month: number,
		year: number
	}>();

	defineEmits<{
		(e: "changeMonth", isPrevious?: boolean): void
	}>();
</script>


<template>
	<header class="header">
		<BaseButton @click="$emit('changeMonth', true)" isPrevious/>
		<h1 class="header__title">{{ `${getMonth(month + 1)}, ${year}` }}</h1>
		<BaseButton @click="$emit('changeMonth')"/>
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
			font-size: 24px;
			font-weight: 600;
		}
	}
</style>