/**
 * Data service
 *
 *
 */

import ServiceBase from '@/services/base.service'
import API_ENDPOINT from '@/services/api.endpoints'


class EmployeeService extends ServiceBase {

	constructor(){
		super()
		this.useRefreshToken() //intercepta tokens erroneos y envia el de refresco
	}
	
	/**
	 * Retorna todos los empleados de una empresa
	 * 
	 * @param {*} id Identifcador de la empresa
	 */
	getEmployees(id){

		return this.client.get(API_ENDPOINT.URL_GET_USERS(id,'employee'),{headers: this.authHeader()})
			.then(response=>{
				return response.data
			})
			// .catch(error =>{
			// 	if (error.response.status!==401)
			// 		throw (error.message)
			// })
	}
}

const employeeServiceInstance= new EmployeeService() //Crea un singleton???

export default employeeServiceInstance