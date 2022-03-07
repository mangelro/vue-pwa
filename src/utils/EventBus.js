

class Event {

	constructor() {
		this.queue = {}
	}

	/*
	 * Registra un controlador para un evento
	 */
	$on(name, callback) {
		this.queue[name] = this.queue[name] || []
		this.queue[name].push(callback)
	}

	/*
	 * Elimina un controlador para un evento
	 */
	$off(name, callback) {
		if (this.queue[name]) {
			for (var i = 0; i < this.queue[name].length; i++) {
				if (this.queue[name][i] === callback) {
					this.queue[name].splice(i, 1)
					break
				}
			}
		}
	}

	/*
	 * Dispara el evento
	 */
	$emit(name, data) {
		if (this.queue[name]) {
			this.queue[name].forEach(function (callback) {
				callback(data)
			})
		}
	}
}

const eventBusInstance = new Event()

// eslint-disable-next-line no-unused-vars
eventBusInstance.install = (app,options={}) => {

	app.config.globalProperties.$eventBus = eventBusInstance

	//const key=Symbol('eventBus')
	const key = 'eventBus'
	app.provide(key, eventBusInstance)

}

//De esta manera se define un Singleton
export default eventBusInstance
