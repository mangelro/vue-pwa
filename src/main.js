import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSignaturePad from 'vue-signature-pad'
import Components from './entry'

import eventBus from './utils/EventBus'

import store from './store'

import './registerServiceWorker'
import './assets/dropzone.css'

createApp(App)
	.use(store)
	.use(router)
	.use(VueSignaturePad)
	.use(Components)
	.use(eventBus)
	// .directive('beer',{
	// 	mounted() {
	// 		// eslint-disable-next-line no-undef
	// 		ui()
	// 	}
	// })
	.mount('#app')
