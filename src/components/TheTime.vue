<template>
	<div class="time-wrapper">
		<h4>{{toDateString}}</h4>
	</div>
	
</template>

<script>
export default {
	data: ()=>({
		theTime:new Date()
	}),
	computed:{
		toDateString(){
			const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
			return this.theTime.toLocaleTimeString('es-ES',options)
		}

	},

	created(){
		setInterval(()=>{this.theTime=new Date()},500)
	}
}
</script>
<style scoped>
.time-wrapper h3{
	
	padding:10px;
	text-align: center;
}
</style>