<template>
	<div class="time-wrapper">
		<h3>{{getCurrentTime}}</h3>
	</div>
	
</template>

<script>
export default {
	data: ()=>({
		theTime:new Date()
	}),
	computed:{
		getCurrentTime(){
			return this.theTime.toLocaleString('es-ES')
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