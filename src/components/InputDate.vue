<template>
	<input type="date" v-model="value" />
</template>

<script>
export default {
	
	props: ['modelValue'],
	emits: ['update:modelValue'],
	computed: {
		value: {
			get() {
				const y = this.modelValue.getFullYear().toString()
				const m = (this.modelValue.getMonth() + 1).toString().padStart(2, '0')
				const d = this.modelValue.getDate().toString().padStart(2, '0')
				return `${y}-${m}-${d}`
			},
			set(value) {
				let [y, m, d] = value.split('-')
				value = new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
				this.$emit('update:modelValue', value)
			},
		},
	},
}
</script>
