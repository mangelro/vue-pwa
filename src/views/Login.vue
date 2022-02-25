<template>
	<div class="row">
		<div class="col m2"></div>
		<div class="col s12 m8">
		<the-login	
			@logged="loggedUser"
			@loggingError="loggingError">
		</the-login>
		</div>
	</div>
	<Teleport to="body">	
		<beer-toast id="toastFirma" ref="beerToast"></beer-toast>
	</Teleport>	
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {

	props:{
		returnUrl:{
			typeof:String,
			required:false,
			default:''
		}
	},

	components: {
		TheLogin: defineAsyncComponent(() => import('../components/TheLogin.vue')),
	},

	methods: {

		loggedUser() {
			
			const url =this.returnUrl||'/'
			
			//console.assert(returnUrl,'sin direccion')
			console.log(url)

			this.$router.push(url)
			// if (!returnUrl){
			// 	console.log('A direccion',returnUrl)
			// 	this.$router.push(returnUrl)
			// }
			// else
			// {
			// 	console.log('A Home',returnUrl)
			// 	this.$router.push({name:'Home'})
			// }
				
		},

		loggingError(error) {
			this.$refs.beerToast.error(error)
		},
	},
}
</script>
