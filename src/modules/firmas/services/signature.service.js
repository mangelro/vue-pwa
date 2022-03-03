/**
 * 
 * 
 */

import ServiceBase from '@/services/base.service'

class SignatureService  extends ServiceBase {

	/**
	 * Envío de firma de emplado
	 * @param {*} signature 
	 */
	async postRegistro(signature){
		await this.client.post('/signatures',signature)
	}

	/**
	 * Envia una justificación
	 * @param {*} justify 
	 */
	async postJustificacion(justify){

		const {data} = await this.client.post('/signatures/justifies',justify,{headers: this.authHeader()})
	
		return data
	}

	/**
	 * Retorna la última firma del empleado
	 * 
	 * @param {Guid} id Identificador del empleado
	 * @returns Última firma del empleado
	 */
	async getLastSignatureById(id){
		const {data} = await this.client.get(`/signatures/${id}/last`,{headers: this.authHeader()})

		return data
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



