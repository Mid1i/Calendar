<script setup lang="ts">
	import BaseButton from "@/components/BaseButton.vue";
	import { convertNumberToMonth } from "@/helpers/converters";


	defineProps<{
		/**
		 * Текущий месяц в виде числа (0-11).
		 * 
		 * @type {number}
		 */
		month: number,
		/**
		 * Текущий год.
		 * 
		 * @type {number}
		 */
		year: number
	}>();
	
	defineEmits<{
		/**
		 * Вызывается, когда необходимо сменить месяц.
		 * 
		 * @param {string} e - Название события, всегда "changeMonth".
		 * @param {boolean} isPrevious - Необязательный флаг, который обозначает направление смены месяца.
		 * Если True, меняется на предыдущий месяц, в противном случае - на следующий.
		 */
		(e: "changeMonth", isPrevious?: boolean): void
	}>();
</script>


<template>
	<header class="header">
		<BaseButton @click="$emit('changeMonth', true)" isPrevious/>
		<h1 class="header__title">{{ `${convertNumberToMonth(month)}, ${year}` }}</h1>
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
			font-size: 20px;
			font-weight: 400;
		}
	}
</style>