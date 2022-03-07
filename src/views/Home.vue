<template>
	<h3>home</h3>
	<button @click="$eventBus.$emit('logout')" >{{baseData}}</button>

	<input-barcode  @code-reader="onCodeReader"></input-barcode>
	<h4>{{barCode}}</h4>
</template>
<script>
import BaseView from './BaseView.vue'

export default {
	extends:BaseView,
	data: ()=>({
		barCode:''
	}),

	methods:{

		onCodeReader(code){
			console.log('Código leido',code)
		}
	}
}
</script>