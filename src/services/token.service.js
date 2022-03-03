/**
 * 
 * 
 * 
 */

const USER_KEY='user_loged.v1'

class TokenService {

	constructor(){
		this.rememberMe=false
	}
	/**
	 * Retorna el usuario almacenado localmente
	 * @returns {Object} Usuario almacenado localmente
	 */
	getUser= ()=>{
		const user=localStorage.getItem(USER_KEY)||sessionStorage.getItem(USER_KEY)

		if (user){
			return JSON.parse(user)
		}
	} 
	/**
	 * Guarda el usuario en almacenamiento local
	 * 
	 * @param {Object} user 
	 * @param {Boolean} rememberMe 
	 */
	setUser(user,rememberMe=false) {
		this.rememberMe=rememberMe
		const userStorage = this.rememberMe ? localStorage : sessionStorage

		userStorage.setItem(USER_KEY, JSON.stringify(user))
	}
	/**
	 * Retorna el token de usuario almacenado localmente
	 * 
	 * @returns {String} Token de acceso 
	 */
	getLocalAccessToken(){
		const user = this.getUser()
	
		if (user && user.accessToken){
			return user.accessToken
		}
	}
	/**
	 * Retorna el token de refresco del usuario almacenado localmente
	 * 
	 * @returns {String} Token de refresco
	 */
	getLocalRefreshToken(){
		const user = this.getUser()
		
		if (user && user.refreshToken)
			return user.refreshToken

	}
	/**
	 * Actualiza el token de acceso del usuario almacenado localmente	
	 * @param {String} accessToken Token de Acceso
	 */
	updateLocalAccessToken(accessToken){


		const user = this.getUser()
		const newUser= {...user}
		newUser.accessToken = accessToken
		
		console.log('updateLocalAccessToken',user.accessToken,newUser.accessToken)		
		
		this.setUser(newUser,this.rememberMe)
	}
	/**
	 * Elimina el usuario del almacenamiento local
	 */
	removeUser() {
		if (this.rememberMe)
			localStorage.removeItem(USER_KEY)
		else
			sessionStorage.removeItem(USER_KEY)
	}

}

export default new TokenService()