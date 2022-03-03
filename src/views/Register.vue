<template>
	<div class="row">
		<div class="col m2"></div>
		<div class="col s12 m8">
		<the-register urlLogin="/login" @register-error="onError"></the-register>
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
		TheRegister: defineAsyncComponent(() => import('../modules/auth/components/TheRegister.vue')),
	},

	methods: {
		onError(error){
			this.$refs.beerToast.error(error)
		}
	},
}
</script>
