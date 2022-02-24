<template>
	<article class="no-padding">
		<the-login
			@logged="loggedUser"
			@loggingError="loggingError">
		</the-login>
	</article>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {

	props:{
		returnUrl:{
			typeof:String,
			required:false,
		}
	},

	components: {
		TheLogin: defineAsyncComponent(() => import('../components/TheLogin.vue')),
	},

	methods: {
	

		loggedUser() {
			if (this.returnUrl)
				this.$router.push(this.returnUrl)
		},

		loggingError(error) {
			this.$beer.toast.warning(error)
		},
	},
}
</script>
