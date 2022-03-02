//import axios from 'axios'

//import  * from '../modules/empleados/services'
import FirmasApi from '../modules/firmas/services/signature.service'
import Auth from '../modules/auth/services/auth.service'

const Plugin = {
	install(app) {
		// Initialize API factoies
		const factories = {
			signature: new FirmasApi(),
			auth: new Auth(),
		}

		app.config.globalProperties.$api = factories

		const key = 'factories'
		app.provide(key, factories)
	},
}
export default Plugin
