import { createStore } from 'vuex'

import employees from '../modules/empleados/store'
import signatures from '../modules/firmas/store'

export default createStore({
   modules: {
    employees,
    signatures
  }
})
