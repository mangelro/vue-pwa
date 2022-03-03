/**
 * Rutas de end point de la api
 */


const API_ENDPOINT = Object.freeze({
	URL_BASE_API:'http://localhost:41321/v1',

	URL_SIGNIN:'/auth/signin',
	URL_SIGNUP:'/auth/signup',
	URL_REFRESH:'/auth/refreshtoken',
	URL_USERS: (id,rol) =>`/users/${id}?rol=${rol}`,
})

export default API_ENDPOINT
