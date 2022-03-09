<template>
	<div class="time-wrapper">
		<h5>{{toDateString}}</h5>
	</div>
	
</template>

<script>

import {toDateTimeString} from '@/utils/dateHelper'

export default {
	data: ()=>({
		theTime:new Date()
	}),
	computed:{
		toDateString(){
			return toDateTimeString(this.theTime)
		}

	},

	created(){
		setInterval(()=>{this.theTime=new Date()},1000)
	}
}
</script>
<style scoped>
.time-wrapper h3{
	
	padding:10px;
	text-align: center;
}
</style>