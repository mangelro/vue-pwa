/**
 * 
 */
import Auth from '../modules/auth/services/auth.service'
import EmployeeService from '../modules/empleados/services/employees.service'
import FirmasApi from '../modules/firmas/services/signature.service'

const Plugin = {
	install(app) {
	
		// Initialize API factoies
		const factories = {
			signature: FirmasApi,
			employees:EmployeeService,
			auth: Auth,
		}

		app.config.globalProperties.$api = factories

		const key = 'factories'
		app.provide(key, factories)
	},
}
export default Plugin
