/**
 * Data service
 *
 *
 */

//import axios from 'axios'
import authHeader from '@/services/auth-header'
import { ServiceBase } from '@/services/serviceBase'



// eslint-disable-next-line no-unused-vars
class EmployeeService extends ServiceBase {
	// constructor() {
	// 	this.client = axios.create({
	// 		baseURL: API_URL,
	// 		timeout: 10000,
	// 	})
	// }

	/**
	 * Retorna los empleados de una empresa
	 * @param {*} id Identifcador de la empresa
	 */
	getEmployess(id){
		return this.client.get(`/users/${id}?rol=employee`,{headers: authHeader()})
			.then(response=>{
				return response.data
			})
			.catch(error =>{
				if (error.response.status===401){
					throw ('No se encuentra autorizado para el recurso')
				}
				
				throw (error.response.statusText)
			})
	}
}

export default new EmployeeService() //Crea un singleton???
