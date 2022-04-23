<template lang='pug'>
.num-inp
	.num-inp__button.num-inp__button--prev(@click="changeVal(-1)") -
	.num-inp__value {{modelValue}}
	.num-inp__button.num-inp__button--next(@click="changeVal(1)") +
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
const props = defineProps(['modelValue', 'min', 'max'])
const emit = defineEmits(['update:modelValue'])

function changeVal(amount){
	let val = props.modelValue + amount;
	const min = +props.min;
	const max = +props.max;
	if(min && min >= val) val = min
	if(max && max <= val) val = max
	emit('update:modelValue', val);
}
</script>

<style lang="sass">
@import "../main.sass"

.num-inp
	color: #fff
	display: flex
	align-items: center
	font-size: 24px

	& > *:not(:last-child)
		margin-right: 0.33em

	&__value
		font-weight: 600

	&__button
		background: rgba(#fff, .1)
		display: flex
		justify-content: center
		align-items: center
		$size: 1.5em
		border-radius: $size
		width: $size
		height: $size
		font-size: 1.2em
		cursor: pointer
		user-select: none
		box-shadow: 0px 0px 6px rgba(#fff, .1)
		transition: box-shadow .2s ease, background .2s ease

		&:hover
			box-shadow: 0px 0px 9px rgba(#fff, .2)
			background: rgba(#fff, .2)
</style>