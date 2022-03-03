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

import ServiceBase from '@/services/base.service'
import TokenService from  '@/services/token.service'
import API_ENDPOINT from '@/services/api.endpoints'



class AuthService extends ServiceBase{

	/**
	 * Verifica las credenciales del usuario y guarda el JWT en el almacenamiento local
	 * @param {*} login 
	 * @returns 
	 */
	login(login) {
		return this.client.post(API_ENDPOINT.URL_SIGNIN, {
			username: login.username,
			password: login.password,
			audience: login.audience
		}).then(response=>{
		
			if (response.data.success) {
				const {id,userName,email,accessToken,roles,expires,refreshToken} = response.data

				const loginUser={id,userName,email,roles,accessToken,expires,refreshToken}
					
				TokenService.setUser(loginUser,login.rememberMe)

				return loginUser
			}
			/*si lanzo una excepción en THEN salta a CATCH */
			throw (response.data.errorMessage)
			
		}).catch(error=>{
			throw (error.response&&error.response.data.title)||error
		})
	}

	/**
	 * Elmina el JWT del almacenamiento local
	 * @returns 
	 */
	logout() {
		return Promise.resolve(TokenService.removeUser())
	}

	/**
	 * Registra un los dato de acceso de un usuario
	 * @param {*} user 
	 * @returns 
	 */
	register(user){
		return this.client.post(API_ENDPOINT.URL_SIGNUP, {
			username: user.username,
			email: user.email,
			password: user.password
		}).then(response=>{
			return response.data
		}).catch(error=>{
			throw(error.message)
		})
	}

}

export default new AuthService() //Crea un singleton???