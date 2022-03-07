/**
 *	Registra todos los componentes
 *
 */
import * as components from './components/components'


// eslint-disable-next-line no-unused-vars
const install = (app,options={}) => {
	Object.entries(components).forEach(([componentName, component]) => {
		app.component(componentName, component)
	})
}

export default  install

//export * from './components/components'
