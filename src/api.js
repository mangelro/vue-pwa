import axios from 'axios'

//import  * from '../modules/empleados/services'
import FirmasApi from './modules/firmas/api/signatureApi'
import Auth from './api/authApi'

const Plugin = {
	install(app, options = {}) {
		//const token ='61eff0ab57cdc2f6dc99d117' //localStorage.getItem('token')

		const instance = axios.create({
			baseURL: 'http://localhost:41321/v1',
			timeout: 10000,
			//headers: {'app-id': token},
			...options,
		})

		// Initialize API factoies
		const factories = {
			signature: FirmasApi(instance),
			auth: Auth(instance),
		}

		app.config.globalProperties.$api = factories

		const key = 'factories'
		app.provide(key, factories)
	},
}
export default Plugin
