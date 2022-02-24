/**
 *	Registra todos los componentes
 *
 */
import components from './components/components'


const install = (app) => {
	Object.entries(components).forEach(([componentName, component]) => {
		console.log(componentName)
		if (componentName !== 'default') {
			app.component(componentName, component)
		}
	})
}

export default install

//export * from './components/components'
