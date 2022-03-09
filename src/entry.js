/**
 *	Registra todos los componentes
 *
 */
import * as components from './components/components'

// eslint-disable-next-line no-unused-vars
const install = (app,options={}) => {
	Object.entries(components).forEach(([componentName, component]) => {
		app.component(componentName, component)

		// if (!app.config.globalProperties.$beer)
		// 	app.config.globalProperties.$beer={}

		// if (componentName==='BeerLoader')
		// 	app.config.globalProperties.$beer[componentName] = component
	})
	
}

export default install

//export * from './components/components'
