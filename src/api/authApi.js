import axios from 'axios'

/**
 * 
 * 
 * 
 * 
 */

// eslint-disable-next-line no-unused-vars
export default (client=axios) => ({
	/**
	 * Devuelve los roles del usuario actual
	 * 	
	 * 	@returns {boolean} true si el usuario se encuentra logeado
	 */
	userRoles() {

		return new Promise((resolve, reject) => {

			try{
				const user = localStorage.getItem('user')
				if (user===null){
					resolve('?')
				}else{
					resolve('*')
				}
			}
			catch (err){
				reject(err)
			}
		})
	},

	getCurrentUser() {
		const user = localStorage.getItem('user')
		console.log('Consultado', user)
		return Promise.resolve(user)
	},

	
	signOut() {
		return Promise.resolve(localStorage.removeItem('user'))
	},

	/**
	 * Realiza el logeo del usuario
	 * 
	 * @param {Login} login datos de login de usuario
	 * @returns {boolean} true si las credenciales del usuario son corectas
	 */
	signIn(login) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (login.name === 'error')
					reject('Imposible conectar con el servicio Auth')

				if (login.name === login.pass) {
					localStorage.setItem('user', login.name)
					resolve(true)
				} else resolve(false)
			}, 1500)
		})
	},
})

// const isAuth=()=>{
//     return new Promise((resolve,reject)=>{
//         const user=miStorage.getItem('user');
//         resolve (user!==null)
//     })
// }

// const getCurrentUser=()=>{
//     const user=miStorage.getItem('user');
//     return Promise.resolve(user);
// }

// const signOut=()=>{
//     return Promise.resolve(miStorage.removeItem('user'))
// }

// /*
//     @login: loginModel
// */
// const signIn=(login)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {

//             if (login.name==='error')
//             reject('Imposible conectar con el servicio Auth')

//             if (login.name===login.pass){
//                 miStorage.setItem('user',login.name)
//                 resolve(true)
//             }else
//                 resolve(false)
//         }, 1500)

//     })
// }

// export default isAuth

// export {signIn,signOut,getCurrentUser}
