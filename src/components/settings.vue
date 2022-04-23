<template lang="pug">
.settings
	.settings__title.part__title Настройки
	.settings__body
		.inp
			.inp__title Задание
			number-inp(:modelValue="task" @update:modelValue="setTask" min=1 :max="tasks.length")
		.inp
			.inp__title Вариант
			number-inp(:modelValue="variant" @update:modelValue="setVariant" min=1 :max="tasks[task-1].variants.length")
</template>

<script>
import numberInp from './numberInp.vue'
import tasks from '@/tasks.json'
export default {
	name: 'settings',
	components: {
		numberInp
	},
	data: () => ({
		tasks
	}),
	methods: {
		setTask(data){
			this.$store.commit('setTask', data);
		},
		setVariant(data){
			this.$store.commit('setVariant', data);
		}
	},
	computed: {
		task() {
			return this.$store.getters.getTask
		},
		variant() {
			return this.$store.getters.getVariant
		}
	}
}
</script>

<style lang='sass'>
@import "../main.sass"

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

	&__body
		display: flex

</style>