/**
 * Retorna el usuario desde el almacenamiento local
 * @returns 
 */

const USER_KEY='user'

export const getUserFromStorage= ()=>{
	const user=localStorage.getItem(USER_KEY)||sessionStorage.getItem(USER_KEY)

	if (user){
		return JSON.parse(user)
	}
	else{
		return null
	}
} 