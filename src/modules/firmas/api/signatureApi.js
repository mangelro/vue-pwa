import axios from 'axios'

/**
 * 
 * 
 */
export default (client=axios) => ({

	/**
	 * Envío de firma de emplado
	 * @param {*} signature 
	 */
	async postRegistro(signature){
		await client.post('/signatures',signature)
	},

	/**
	 * Envia una justificación
	 * @param {*} justify 
	 */
	async postJustificacion(justify){

		const {data} = await client.post('/signatures/justifies',justify)

		console.log(data)
		
		// return {
		// 	...justify,
		// 	contentUrl: "http://localhost:50443/v1/signatures/justifies/21323/content"
		// }
		return data;
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



