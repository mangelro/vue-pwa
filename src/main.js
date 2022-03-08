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
	.directive('lazy-img',{
		// eslint-disable-next-line no-unused-vars
		created:(el,binding)=>{
			const fn=(e) => {
				e.stopPropagation()
			
				const thisElement=el

				const {top}=thisElement.getBoundingClientRect() 

				const isVisible =(window.scrollY - top - thisElement.offsetTop) > 0

				if (isVisible){

					const downloadingImage  =new Image()
					downloadingImage .onload=function(){
						thisElement.src=this.src
					}
					downloadingImage.src=binding.value

				}
			}
			window.addEventListener('scroll', fn)
		}
	})
	.mount('#app')
