/**
 * 
 * 
 */
import {getUserFromStorage} from '@/services/userStorageHelper'
import AuthService from '../services/auth.service'
 
const user = getUserFromStorage()
 
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null }

export default {
	namespaced: true,

	state: ()=>({...initialState}), //MUCHO OJO se puede asignar directamente

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
			try
			{
				const user = await AuthService.login(login)
		
				commit('loginSuccess', user)
				return Promise.resolve(user)
			}
			catch(error)
			{
				commit('loginFailure')
				return Promise.reject(error)
			}
		},
		
		logout({ commit }) {
			AuthService.logout()
			commit('logout')
		},

		async register({ commit }, user) {
			try
			{
				const response = await AuthService.register(user)
				commit('registerSuccess')
				return Promise.resolve(response.data)

			}
			catch (error)
			{
				commit('registerFailure')
				return Promise.reject(error)
			}
		}
	},

	getters: {},
}
