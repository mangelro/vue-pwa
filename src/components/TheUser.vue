<template>
	<div class="field border">
		<input type="text" 
			:value="firstName"
			@input="$emit('update:firstName',$event.target.value)">
		
		<span class="helper">Nombre usuario</span>
	</div>

	<div class="field border">
		<input type="text" 
			:value="lastName"
			@input="$emit('update:lastName',$event.target.value)">

		<span class="helper">Apellidos usuario</span>
	</div>
</template>

<script>
export default {
	props:{
		firstName:{
			type:String,
			reqired:true,
			defaul:''
		},
		lastName:{
			type:String,
			reqired:true,
			defaul:''
		}
	},
	
	emits:['update:firstName','update:lastName']
}
</script>