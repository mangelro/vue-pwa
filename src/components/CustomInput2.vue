/**
	Para realizar un enlace v-model personalizado
 */

<template>
	<div class="field label prefix border">
		<i>search</i>
		<input type="text" v-model="value">
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
		}
	}
	,
	computed:{
		value:{
			get(){
				return this.modelValue
			},
			set(value){ 
				this.$emit('update:modelValue',value)
			}
		}
	},

	emits:['update:modelValue']
}
</script>