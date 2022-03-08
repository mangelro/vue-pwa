<template>

	<div class="row">
		<div class="col s12"><h3>home</h3></div>
		<div class="col s12"><button  @click="onClick" >{{baseData}}</button></div>
		<div class="col s12"><input-barcode v-model="barCode1" @code-readed="onCodeReader"></input-barcode></div>
		<div class="col s12">
			<a class="chip small" v-for="(bc,i) in barCode" :key="i" @click="closeMe(i)"><i class="small">close</i><span>{{bc}}</span></a></div>
	</div>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	<div class="row">
		<div class="col s12"><img src="../assets/image-not-found.png" class="responsive" v-lazy-img="'http://wp.interpanel.es/wp-content/uploads/2018/07/olivos-e1532075560599.jpg'"></div>
	</div>
</template>
<script>
import BaseView from './BaseView.vue'

export default {
	extends:BaseView,

	data: ()=>({
		barCode1:'123456',
		barCode2:'123456',
		barCode:[]
	}),

	inject:['eventBus'], //eventBus DI

	methods:{
		closeMe(index){
			//const index=event.target.getAttribute('data-id')
			this.barCode.splice(index,1)
		},
		onCodeReader({code}){
			this.barCode.push(code)
		},
		onClick(){
			this.eventBus.$emit('logout')
		}
	},

	created(){
		//console.log(this.$beer.BeerLoader.showLoader())
	}



}
</script>