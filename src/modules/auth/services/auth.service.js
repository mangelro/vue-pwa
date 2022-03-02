/**
 * Authentication service
 * 
 * POST api/auth/signup for User Registration
 * POST api/auth/signin for User Login
 * 
 * 
 * login(): POST {username, password} & save JWT to Local Storage
 * logout(): remove JWT from Local Storage
 * register(): POST {username, email, password}
 */

// import axios from 'axios'
// const API_URL = 'http://localhost:41321/v1/auth'

import { ServiceBase } from '@/services/serviceBase'


const USER_KEY='user'

// eslint-disable-next-line no-unused-vars
class AuthService extends ServiceBase{

	constructor(){
		super()
		// this.client=axios.create({
		// 	baseURL:API_URL,
		// 	timeout: 10000,
		// })

		this.clearUserStorage= ()=>{
			localStorage.removeItem(USER_KEY)
			sessionStorage.removeItem(USER_KEY)
		}
	}

	/**
	 * Verifica las credenciales del usuario y guarda el JWT en el almacenamiento local
	 * @param {*} login 
	 * @returns 
	 */
	login(login) {
		return this.client.post('/auth/signin', {
			username: login.username,
			password: login.password,
			audience: login.audience
		}).then(response=>{
		
			if (response.data.success) {
				const userStorage = login.rememberMe ? localStorage : sessionStorage

				const {id,userName,email,accessToken,roles} = response.data

				userStorage.setItem(USER_KEY, JSON.stringify({id,userName,email,roles,accessToken}))
			}

			return response.data.success
		}).catch(error=>{
			throw (error.response.data.title)
		})
	}

	/**
	 * Elmina el JWT del almacenamiento local
	 * @returns 
	 */
	logout() {
		return Promise.resolve(this.clearUserStorage())
	}

	/**
	 * Registra un los dato de acceso de un usuario
	 * @param {*} user 
	 * @returns 
	 */
	register(user){
		return this.client.post('/auth/signup', {
			username: user.username,
			email: user.email,
			password: user.password
		}).then(response=>{
			return response.data
		}).catch(error=>{
			console.log(error.message)
			throw(error.message)
		})
	}

}

export default new AuthService() //Crea un singleton???