/**
 * 
 */
import SignatureService from '../services/signature.service'

export default {
	namespaced: true,

	state: () => ({
		lastSigns:[]
	}),

	mutations: {
		registerSignature(state,signature){

			const idx=state.lastSigns.findIndex(s=> s.employeeId===signature.employeeId)
				
			if (idx<0)
				state.lastSigns.push(signature)
			else
				state.lastSigns[idx]=signature

		}
	},

	actions: {
		async saveSignature({commit},signature) {

			
			// eslint-disable-next-line no-unused-vars
			const signatureSaved=await SignatureService.registroFirma({...signature})
			
			commit('registerSignature',{...signature})
		},
	},

	getters: {
		lastSignature:(state)=>{
			return (id=0)=>{
	
				const sign=state.lastSigns.find(s=> s.employeeId===id)
				
				if (!sign)
					return

				return {...sign}
			}
		}
	},
}
