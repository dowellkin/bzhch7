<template lang='pug'>
main.main
	.container
		.main__inner
			.main__settings
				settings
				variant
			.main__content
				content
</template>



<script>
import tasks from '@/tasks.json'
import numberInp from './numberInp.vue'
import settings from './settings.vue'
import variant from './variant.vue'
import content from './content.vue'

export default {
	name: "body-view",
	components: {
		numberInp,
		settings,
		variant,
		content
	},
	data: () => ({
		tasks,
	}),
	created(){
		const params = new URLSearchParams(window.location.search);
		this.task =  +params.get('task') || 1;

		if(this.task != +this.task || this.task > this.tasks.length || this.task < 1){
			this.task = 1;
		}

		this.variant =  +params.get('variant') || 1;

		if(this.variant != +this.variant || this.variant > this.tasks[this.task-1].variants.length || this.variant < 1){
			this.variant = 1;
		}

		this.$store.commit('setTask', this.task);
		this.$store.commit('setVariant', this.variant);
	}
}
</script>

<style lang='sass'>
.main
	padding-top: 20px

	&__settings
		display: flex
		gap: 50px

		@media (max-width: 768px)
			flex-wrap: wrap

		@supports not (gap: 20px)
			.settings
				margin-right: 50px

				@media (max-width: 768px)
					margin-bottom: 50px
</style>