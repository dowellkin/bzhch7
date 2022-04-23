<template lang="pug">
.dd
	.dd__title.part__title Исходные данные
	.dd__body
		.dd__field
			span Местность: 
			span.dd__value {{translate(task.meta.space)}}
		.dd__field
			span Количество: 
			span.dd__value {{translate(task.meta.size)}} т.
		.dd__field
			span Расстояние до объекта или рубежа: 
			span.dd__value {{translate(task.meta.distance)}} км.
		.dd__field
			span Рабочие: 
			span.dd__value {{translate("peoples_"+task.meta.workers)}}
		.dd__field
			span Население: 
			span.dd__value {{translate("peoples_"+task.meta.peoples)}}
		.dd__field
			span Время суток: 
			span.dd__value {{translate(variant.time)}}
		.dd__field
			span Состояние атмосферы: 
			span.dd__value {{translate(variant.weather)}}
		.dd__field
			span Тепература воздуха: 
			span.dd__value {{variant.temperature > 0 ? `+${variant.temperature}` : variant.temperature}} ˚С
		.dd__field
			span Скорость ветра: 
			span.dd__value {{variant.wind}} м/с
		.dd__field
			span СИЗ работников: 
			span.dd__value {{variant.sizWorkers}}
		.dd__field
			span СИЗ населения: 
			span.dd__value {{variant.sizPeoles}}
		.dd__field
			span Количество работников: 
			span.dd__value {{variant.countWorkers}}
		.dd__field
			span Количество населения: 
			span.dd__value {{variant.countPeoples}}

</template>


<script>
import dict from "@/dict.json"
export default {
	name: 'dd',
	computed: {
		task(){
			return this.$store.getters['getFullTask']
		},
		variant(){
			return this.$store.getters['getFullVariant']
		}
	},
	methods: {
		translate(str){
			return dict[str] ?? str
		}
	}
}
</script>

<style lang='sass'>
@import "../main.sass"

.dd

	&__body
		color: #fff
		display: flex
		flex-wrap: wrap
		gap: 0 20px
		@supports not (gap: 20px)
			& > *:not(:last-child)
				margin-right: 20px

	&__value
		color: $c-main
</style>