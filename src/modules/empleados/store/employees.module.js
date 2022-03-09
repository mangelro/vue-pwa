/**
 *  
 * 
 */
import EmployeesService from '../services/employees.service'
import TokenService from  '@/services/token.service'

export default {
	namespaced: true,

	state: () => ({
		expires:-1,
		employees: []
	}),

	mutations: {

		setEmployees(state,employees){
			state.employees=employees
			state.expires=new Date().getTime() + (60*1000) //cacheo 1 minuto
		}


	},

	actions: {

		async loadAllEmployees({commit,state}){
					
			//cacheo 1 minuto
			if ((state.expires - new Date().getTime()) < 0 ){
			
				const {id} = TokenService.getUser()//

				const employees = await EmployeesService.getEmployees(id) //TODO: No es correcto. Ha de ser el Id de la empresa
	
				if(employees)
					commit('setEmployees',[...employees])

			}

		}

	},

	getters: {
		getAllEmployees: (state) => {

			const employees = state.employees
			return [...employees]
		},

		/* 	retorna una función para posibilidar el uso de
			parámetros enlos getters
		 */
		getEmployeById: (state) => (id = 0) => {
		
			const employee = state.employees.find(e => e.id === id)
				
			if (!employee) return {}
			
			
			//return { ...employee } //es MUY aconsejable devolver una copia por si se modifica, no modificar el State!!!!!
			return employee
		}
	},
}
