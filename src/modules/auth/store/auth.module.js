/**
 * 
 * 
 */
import AuthService from '../services/auth.service'
import TokenService from '@/services/token.service'
 
const user = TokenService.getUser()
 
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null }

export default {
	namespaced: true,

	state:initialState, 

	mutations: {
		loginSuccess(state,user){
			state.status.loggedIn=true
			state.user=user
		},

		loginFailure(state){
			state.status.loggedIn=false
			state.user=null
		},

		logout(state){
			state.status.loggedIn=false
			state.user=null
		},
		
		registerSuccess(state){
			state.status.loggedIn = false
		},

		registerFailure(state){
			state.status.loggedIn = false
		}
	},

	actions: {

		async login({commit},login){
			const user = await AuthService.login(login)
			commit('loginSuccess', user)
			return user
		},
		
		async logout({ commit }) {
			await AuthService.logout()
			commit('logout')
		},

		async register({ commit }, user) {
			const registedUser = await AuthService.register(user)
			commit('registerSuccess')
			return registedUser
		}
	},

	getters: {},
}
