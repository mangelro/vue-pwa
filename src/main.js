/**
 * 
 * 
 * 
 * 
 */

import Apis from './services/'
import App from './App.vue'
import Components from './entry'
import {createApp} from 'vue'
import eventBus from './utils/eventBus'
import router from './router'
import store from './store'
import VueSignaturePad from 'vue-signature-pad'


import './assets/dropzone.css'
import './registerServiceWorker'

createApp(App)
	.use(store)
	.use(router)
	.use(VueSignaturePad)
	.use(Components)
	.use(Apis)
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

					const downloadingImage=new Image()
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
