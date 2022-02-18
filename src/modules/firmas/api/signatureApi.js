import axios from 'axios'

/**
 * 
 * 
 */
export default (client=axios) => ({

	async postSignature(sig){

		await client.post('/signatures',sig)
	},

	/**
	 * Retorna la última firma del empleado
	 * 
	 * @param {Guid} id Identificador del empleado
	 * @returns Última firma del empleado
	 */
	async getLastSignatureById(id){
		const {data} = await client.get(`/signatures/${id}/last`)

		return data
	},

	/**
	 * Retorna las firmas de un empleado entre dos fechas
	 * 
	 * @param {Guid} id Identificador del empleado
	 * @param {Date} from Fecha inicial del rango
	 * @param {Date} to Fecha final del rango
	 * @returns Página de firmas
	 */
	async getSignatureByDate(id,from,to){

		const {data} = await client.get(`/signatures/${id}?f=${from}&t=${to}`)

		return data
	}



})



