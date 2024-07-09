<script setup lang="ts">
	defineProps<{
		isPrevious?: boolean
	}>();
</script>


<template>
	<button class="button">
		<svg class="button__icon" fill="none" height="14" viewBox="0 0 8 14" width="8">
			<path 
				:d="isPrevious ? 'M7 1L1 7L7 13' : 'M1 1L7 7L1 13'" 
				stroke="white" 
				stroke-width="2" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</template>


<style scoped lang="scss">
	.button {
		background: transparent;
		
		height: 30px;
		width: 30px;
	}
</style>