/**
 *
 *
 */

import axios from 'axios'
import TokenService from  '@/services/token.service'
import API_ENDPOINT from '@/services/api.endpoints'

import EVENTBUS from '@/utils/EventBus'

export  default class ServiceBase {
	
	constructor() {

		this.eventBus=EVENTBUS

		this.client = axios.create({
			baseURL: API_ENDPOINT.URL_BASE_API,
			timeout: 10000,
			headers:{
				'accept': 'application/json',
				'x-develop':'FdO'
			}
			//,
			// transformRequest: [
			// 	// eslint-disable-next-line no-unused-vars
			// 	(data,header) => {
			// 		// modify data here
			// 		console.log('transformRequest',data)
			// 		//return data
			// 	}
			// ]
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
				const originalCLient = this.client

				if (originalConfig.url !== API_ENDPOINT.URL_SIGNIN && err.response) {

					// Access Token was expired
					if (err.response.status === 401 && !originalConfig._retry) {
						originalConfig._retry = true
						try {

							const rs = await originalCLient.post(API_ENDPOINT.URL_REFRESH, {
								accessToken: TokenService.getLocalAccessToken(), //No es necesario
								refreshToken: TokenService.getLocalRefreshToken()
							})
							
							const { accessToken } = rs.data
						
							//store.dispatch('auth/refreshToken', accessToken) //?????
							TokenService.updateLocalAccessToken(accessToken)

							originalConfig.headers.Authorization='Bearer ' + accessToken

							return originalCLient(originalConfig)

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

