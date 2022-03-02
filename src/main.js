import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSignaturePad from 'vue-signature-pad'
import Components from './entry'

import store from './store'
//import apis from './services'

import './registerServiceWorker'
import './assets/dropzone.css'

createApp(App)
	.use(store)
	.use(router)
	.use(VueSignaturePad)
	.use(Components)
	.mount('#app')
