import { mapState } from 'vuex';
<template>
	<!-- <a class="chip round" @click="logOut" v-if="currentUser">
		<i class="responsive">account_circle</i>
		<span>{{currentUser}}</span>
		
	</a> -->
	<a v-if="isLoggedIn">
		<span><i class="outlined">account_circle</i>{{userName}}</span>
		<a href @click.prevent="logOut"><i class="small outlined">exit_to_app</i>Salir</a>
	</a>
</template>

<script>

import {mapActions,mapState} from 'vuex'

export default {

	// data:()=>({
	// 	isLoggedIn:false,
	// 	currentUser:null
	// }),

	computed:{

		...mapState('auth',{
			isLoggedIn:(state)=>state.status.loggedIn,
			userName:(state) =>state.user.userName
		}),

		// isLoggedIn(){
		// 	return this.$store.state.auth.status.loggedIn
		// },
		// currentUser(){
		// 	return this.$store.state.auth.user
		// }
	},

	inject:['eventBus'], //eventBus install

	methods: {
		...mapActions('auth',['logout']),

		async logOut() {
			await this.logout()
			this.$router.push({name:'Home'})
		}
	},
	mounted() {
		this.eventBus.$on('logout', async () => {
			this.logOut()
		})
	},
	beforeUnmount() {
		this.eventBus.$off('logout')
	}
	
}
</script>

<style></style>
