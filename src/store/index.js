import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'

import employees from '../modules/empleados/store/employees.module'
import signatures from '../modules/firmas/store/firmas.module'

import auth from '../modules/auth/store/auth.module'

export default createStore({
	modules: {
		auth,
		employees,
		signatures,
	},
	plugins: [createPersistedState()]
})
