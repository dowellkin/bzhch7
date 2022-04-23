<template lang='pug'>
main.main
	.container
		.main__inner
			.main__settings
				.settings
					.settings__title Настройки
					.settings__body
						.inp
							.inp__title Задание
							number-inp(v-model="task" min=1 max=3)
						.inp
							.inp__title Вариант
							number-inp(v-model="variant" min=1 max=4)
</template>

<script setup>
import { ref } from 'vue'
import numberInp from './numberInp.vue'
import tasks from '@/tasks.json'
const params = new URLSearchParams(window.location.search);
const taskInfo = {
	value: +params.get('task') || 1,
	min: 1,
	max: tasks.length
}
if(taskInfo.value != +taskInfo.value || taskInfo.value > taskInfo.max || taskInfo.value < taskInfo.min){
	taskInfo.value = 1;
}
let task = ref(taskInfo.value);

const variantInfo = {
	value: +params.get('variant') || 1,
	min: 1,
	max: tasks[task.value].variants.length
}
if(variantInfo.value != +variantInfo.value || variantInfo.value > variantInfo.max || variantInfo.value < variantInfo.min){
	variantInfo.value = 1;
}
let variant = ref(variantInfo.value);
</script>

<style lang='sass'>
@import "../main.sass"
.main
	padding-top: 20px

.inp
	display: flex
	flex-direction: column
	align-items: center

	&:not(:last-child)
		margin-right: 20px

	&__title
		margin-bottom: 5px
		text-transform: uppercase
		color: #fff
		font-weight: 600

.settings
	padding-left: 20px
	border-left: 2px solid $c-main
	&__title
		font-size: 36px
		color: $c-main
		font-weight: bold
		margin-bottom: 25px

	&__body
		display: flex
</style>