/**
	Para realizar un enlace v-model personalizado
		· La propiedad modelo debe llamarse -modelValue-
		· El evento que notifica la modificacion -input- al padre, debe poseer la forma -update:modelValue-

	By default, v-model on a component uses modelValue as the prop and update:modelValue as the event.
 */

<template>
	<div class="field label prefix border">
		<i>search</i>
		<input type="text"
			:value="modelValue"
			@change="emitValue">
		
		<label>Búsqueda</label>
	</div>
</template>

<script>
export default {
	
	props:{
		modelValue:{
			type:String,
			required:true,
			default:''
		},
		modelModifiers: {
			default: () => ({})
		}
	},

	created(){
		console.log(this.modelModifiers)
	},

	methods:{
		emitValue(e) {
			let value = e.target.value

			if (this.modelModifiers.capitalize)
				value=value.toUpperCase()

			if (this.modelModifiers.reverse)
				value = Array.from(value).reverse().join('')

			this.$emit('update:modelValue',value)
		}

	},

	emits:['update:modelValue']
}
</script>