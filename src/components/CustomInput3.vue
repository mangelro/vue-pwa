/**
	Para realizar un enlace v-model personalizado
		· La propiedad modelo debe llamarse -modelValue-
		· El evento que notifica la modificacion -input- al padre, debe poseer la forma -update:modelValue-

	By default, v-model on a component uses -modelValue- as the prop and -update:modelValue- as the event.

	The child component should expect a -search- prop and emit an -update:search- event to update the parent value
 */
<template>
	<div class="field label prefix border">
		<i>search</i>
		<input type="text"
			:value="search"
			@input="$emit('update:search',$event.target.value)">
		
		<label>Búsqueda</label>
	</div>
</template>

<script>
export default {
	
	props:{
		search:{
			type:String,
			required:true,
			default:''
		}
	},

	emits:['update:search']
}
</script>