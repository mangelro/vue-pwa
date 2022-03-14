<template>
	<input 
		type="text" 
		:id="id"
		@keypress="onHandleKeyPress"
		ref="theInput"
		:value="value"
		@input="onInput">
</template>
<script>


// const delayer = (timeout) => new Promise(resolve =>{
// 	setTimeout(()=>resolve('ok'),timeout)
// })

/**
 * Valores por defecto
 */
const defaultOptions={
	autoDel:true,
	minChars:4,
	keyCode:13
}

export default {

	props: {
		id:{
			type:String,
			required:false,
			default:() => {
				return '_myBarcodeReader_' + Math.ceil(performance.now(),0)
			}
		},

		modelValue:{
			type:String,
			default:''
		},

		options:{
			type:Object,
			required:false,
			default(){
				return {
					...defaultOptions
				}
			}
		}
	},

	emits: ['update:modelValue','codeReaded'],

	data(){
		return{
			/*
			 * No se inicializa con this.modelValue ya que no me interesa establecer un valor. Es un component
			 * de solo lectura*/
			value:'',
			inputStart:null,
			inputStop:null,
			firstKey:null,
			lastKey:null,
			timing:null,
			userFinishedEntering:null
		}
	},

	watch:{
		modelValue(newValue){
			this.value=newValue
		}
	},

	computed:{
		normalizedOptions(){
			return Object.assign(defaultOptions, this.options)
		},
	},

	methods:{

		/**
		 * Evento cuando se modifica el textbox
		 */
		onInput(event){
			this.value = event.target.value
			this.$emit('update:modelValue', this.value)
		},

		/**
		 * Evento cuando se presiona una tecla en el textbox
		 */
		onHandleKeyPress(event){

			// restart the timer
			if (this.timing) {
				clearTimeout(this.timing)
			}
			
			// handle the key event
			if (event.which === this.normalizedOptions.keyCode) {
				// Enter key was entered
				
				// don't submit the form
				event.preventDefault()

				// Ha terminado el usuario la entrada manual?

				if (this.value.length >= this.normalizedOptions.minChars) {
					this.userFinishedEntering = true // incase the user pressed the enter key
					this.inputComplete()
				}
			}
			else{
				// some other key value was entered
				// could be the last character
				this.inputStop = performance.now()
				this.lastKey = event.which
				// don't assume it's finished just yet
				this.userFinishedEntering = false

				// is this the first character?
				if (!this.inputStart) {
					this.firstKey = event.which
					this.inputStart = this.inputStop
					// watch for a loss of focus
					this.$refs.theInput.addEventListener('blur',this.onInputBlur)
					//$("body").on("blur", self._selector, this.inputBlur)
				}
				
				// start the timer again
				this.timing = setTimeout(this.inputTimeoutHandler, 500)
			}
		},

		/**
		 * Evento cuando el textbox pierde el foco
		 */
		onInputBlur(){
			clearTimeout(this.timing)
            
			if (this.value.length >= this.normalizedOptions.minChars) {
				this.userFinishedEntering = true
				this.inputComplete()
			}
		},

		/**
		 * 
		 */
		inputTimeoutHandler() {
			// stop listening for a timer event
			clearTimeout(this.timing)
			
			// if the value is being entered manually and hasn't finished being entered
			if (!this.isUserFinishedEntering() || this.value.length < this.normalizedOptions.minChars) {
				// keep waiting for input
				return
			}
			else {
				alert('salida??')
			}
		},

		/**
		 * 
		 */
		inputComplete() {

			// stop listening for the input to lose focus
			this.$refs.theInput.removeEventListener('blur',this.onInputBlur)


			// report the results
			this.$refs.theInput.focus({preventScroll:true})
			this.$refs.theInput.select()

			this.$emit('codeReaded',{id:this.id, code:this.value})

			this.resetValues()
		},
		/**
		 * 
		 */
		resetValues() {
			// clear the variables
			this.inputStart = null
			this.inputStop = null
			this.firstKey = null
			this.lastKey = null

			// clear the results
			if (this.normalizedOptions.autoDel){
				this.value=''
			}
		
		},

		// Determine if the user is just typing slowly
		isUserFinishedEntering() {
			return !this.isScannerInput() && this.userFinishedEntering
		},

		/**
		 * Asume que se está utilizando scanner si es realmente rápido
		 * 
		 */
		isScannerInput() {
			return (((this.inputStop - this.inputStart) / this.value.length) < 15)
		} 


	},
}
</script>