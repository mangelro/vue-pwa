import { mapState } from 'vuex';
<template>
	<!-- <a class="chip round" @click="logOut" v-if="currentUser">
		<i class="responsive">account_circle</i>
		<span>{{currentUser}}</span>
		
	</a> -->
	<a v-if="isLoggedIn">
		<span><i class="outlined">account_circle</i>{{name}}</span>
		<a href="./" @click.prevent="logOut"><i class="small outlined">exit_to_app</i>Salir</a>
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
			name:(state) =>state.user.userName


		})
		// isLoggedIn(){
		// 	return this.$store.state.auth.status.loggedIn
		// },
		// currentUser(){
		// 	return this.$store.state.auth.user
		// }
	},

	methods: {
		...mapActions('auth',['logout']),

		logOut() {
			this.logout()
			this.$router.push({name:'Home'})
		}
	}
}
</script>

<style></style>
