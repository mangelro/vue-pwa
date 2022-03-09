/**
 *
 *
 */
import API_ENDPOINT from '@/services/api.endpoints'
import axios from 'axios'
import EVENTBUS from '@/utils/eventBus'
import TokenService from '@/services/token.service'

export default class ServiceBase {
	
	constructor() {

		this.eventBus=EVENTBUS

		this.client = axios.create({
			baseURL: API_ENDPOINT.URL_BASE_API,
			timeout: 10000,
			headers:{
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
			,transformRequest: [
				(data, headers) => {
					headers['X-Develop']='fdo'
					const newData={...data} //WARNING:Si objeto de datos está anidado puede dar problemas
					return JSON.stringify(newData)
				},
			]
		})
	}

	/**
	 * Retorna la cabecera de autheticacion
	 * @returns Cabecera de Authenticacion Bearer
	 */
	authHeader(){
		const accessToken = TokenService.getLocalAccessToken()

		//TODO: Verificar tiempo expiración JWT
		if (accessToken) {
			return { Authorization: 'Bearer ' + accessToken }
		} else {
			return {}
		}
	}

	/**
	 * Establece la captura de peticiones para establecer token de acceso
	 *
	 */
	setAccessTokenInterceptor(){
		this.client.interceptors.request.use(
			(config) => {

				const token = TokenService.getLocalAccessToken()

				if (token) {
					config.headers['Authorization'] = 'Bearer ' + token
				}

				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)
	}

	/**
	 * Establece la captura de respuesta denegadas para establecer token de refresco
	 */
	useRefreshToken(){
		this.client.interceptors.response.use(
			(res) => {
				return res
			},
			async (err) => {
				const originalConfig = err.config
				const originalClient = this.client

				if (originalConfig.url !== API_ENDPOINT.URL_SIGNIN && err.response) {

					// Access Token was expired
					if (err.response.status === 401 && !originalConfig._retry) {
						originalConfig._retry = true
						try {

							const rs = await originalClient.post(API_ENDPOINT.URL_REFRESH, {
								accessToken: TokenService.getLocalAccessToken(), //No es necesario
								refreshToken: TokenService.getLocalRefreshToken()
							})
							
							const { accessToken } = rs.data
						
							//store.dispatch('auth/refreshToken', accessToken) //?????
							TokenService.updateLocalAccessToken(accessToken)

							originalConfig.headers.Authorization='Bearer ' + accessToken

							return originalClient(originalConfig)

						} catch (_error) {
							return Promise.reject(_error)
						}
					}
				}
				return Promise.reject(err)
			}
		)
	}
}