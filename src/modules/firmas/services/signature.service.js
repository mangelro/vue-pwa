/**
 * 
 * 
 */

import API_ENDPOINT from '@/services/api.endpoints'
import ServiceBase from '@/services/base.service'

class SignatureService extends ServiceBase {

	/**
	 * Envío de firma de emplado
	 * @param {*} signature 
	 */
	registroFirma(signature){
		return this.client.post(API_ENDPOINT.URL_SIGNATURE,signature,{headers: this.authHeader()})
			.then(response=>{
				const{data}=response
				
				this.eventBus.$emit('signature-created',data)
				return data
			})
	}

	/**
	 * Envia una justificación
	 * @param {*} justify 
	 */
	registroJustificacion(justify){
		return this.client.post(API_ENDPOINT.URL_JUSTIFIES,justify,{headers: this.authHeader()})
			.then(response=>{
				const{data}=response

				this.eventBus.$emit('justify-created',data)
				return data
			})
	}

	/**
	 * Retorna la última firma del empleado
	 * 
	 * @param {Guid} id Identificador del empleado
	 * @returns Última firma del empleado
	 */
	getLastSignatureById(id){
		return this.client.get(API_ENDPOINT.URL_GET_SIGNATURE(id),{headers: this.authHeader()})
			.then(response=>{
				return response.data
			})
	}

	/**
	 * Retorna las firmas de un empleado entre dos fechas
	 * 
	 * @param {Guid} id Identificador del empleado
	 * @param {Date} from Fecha inicial del rango
	 * @param {Date} to Fecha final del rango
	 * @returns Página de firmas
	 */
	async getSignatureByDate(id,from,to){

		const {data} = await this.client.get(`/signatures/${id}?f=${from}&t=${to}`,{headers: this.authHeader()})
		return data
	}
}

export default new SignatureService