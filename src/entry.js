/**
 *	Registra todos los componentes
 *
 */
import * as components from './components/components'


const install = (app) => {
	Object.entries(components).forEach(([componentName, component]) => {
		app.component(componentName, component)
	})
}

export default  install

//export * from './components/components'
