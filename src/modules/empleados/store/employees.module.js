/**
 * 
 * 
 * 
 * 
 */

import EmployeesService from '../services/employees.service'
import {getUserFromStorage} from '@/services/userStorageHelper'



export default {
	namespaced: true,

	state: () => ({
		employees: []
	}),

	mutations: {

		setEmployees(state,employees){
			state.employees=employees
		}


	},

	actions: {

		async loadAllEmployees({commit}){
			const {id} = getUserFromStorage()
			const employees = await EmployeesService.getEmployess(id) //TODO: No es correcto. Ha de ser el Id de la empresa

			if(employees)
				commit('setEmployees',[...employees])
		}

	},

	getters: {
		getAllEmployees: (state) => {

			const employees = state.employees
			return [...employees]
		},

		getEmployeById: (state) =>{
			/* 	retorna una función para posibilidar el uso de
				parámetros enlos getters
			 */
			return (id = 0) => {
				const employe = state.employees.find((e) => e.id === id)

				if (!employe) return
				
				return { ...employe } //es MUY aconsejable devolver una copia por si se modifica, no modificar el State!!!!!
			}
		}
	}
}
