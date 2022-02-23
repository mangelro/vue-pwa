import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSignaturePad from 'vue-signature-pad'
import Toast from './components/BeerToast'

import store from './store'
import api from './api'


import './registerServiceWorker'
import './assets/dropzone.css'

createApp(App).use(store)
	.use(router)
	.use(VueSignaturePad)
	.use(api)
	.component(Toast.name,Toast)
	.mount('#app')
