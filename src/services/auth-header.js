/**
 * Función de ayuda para crear cabeceras de Authorization
 */

import {getUserFromStorage} from './userStorageHelper'

export default () => {

	const {accessToken} = getUserFromStorage()
	
	//TODO: Verificar tiempo expiración JWT
	if (accessToken) {
		return { Authorization: 'Bearer ' + accessToken }
	} else {
		return {}
	}
}
