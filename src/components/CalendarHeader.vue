<script setup lang="ts">
	import { convertNumberToMonth } from "@/helpers/converters";
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
		<h1 class="header__title">{{ `${convertNumberToMonth(month + 1)}, ${year}` }}</h1>
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