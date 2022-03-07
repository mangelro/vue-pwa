<template>
	<input 
		type="text" 
		:id="id"
		@keypress="handleKeyPress"
		ref="theInput"
		:value="value"
		@input="onInput"
	>
</template>
<script>
export default {


	props: {
		id:{
			type:String,
			required:false,
			default:'_myBarcodeReader'
		},

		modelValue:{
			type:String,
			default:''
		}
	},

	emits: ['update:modelValue','codeReader'],

	data(){
		return{
		
			value:this.modelValue,

			options:{
				autoDel:true,
				minChars:3
			},

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


	methods:{

		onInput(event){
			this.value = event.target.value
			this.$emit('update:modelValue', this.value)
		},

		handleKeyPress(event){

			// restart the timer
			if (this.timing) {
				clearTimeout(this.timing)
			}

			
			// handle the key event
			if (event.which == 13) {
				// Enter key was entered
				
				// don't submit the form
				event.preventDefault()

				// Ha terminado el usuario la entrada manual?

				if (this.value.length >= this.options.minChars) {
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
					this.$refs.theInput.addEventListener('blur',this.inputBlur)
					//$("body").on("blur", self._selector, this.inputBlur)
				}
				
				// start the timer again
				this.timing = setTimeout(this.inputTimeoutHandler, 500)
			}
		},

		inputBlur(){
			clearTimeout(this.timing)
            
			if (this.value.length >= this.options.minChars) {
				this.userFinishedEntering = true
				this.inputComplete()
			}
		},

		inputTimeoutHandler() {
			// stop listening for a timer event
			clearTimeout(this.timing)
			
			// if the value is being entered manually and hasn't finished being entered
			if (!this.isUserFinishedEntering() || this.value.length < 3) {
				// keep waiting for input
				return
			}
			else {
				alert('salida??')
			}
		},

		inputComplete() {

			// stop listening for the input to lose focus
			this.$refs.theInput.removeEventListener('blur',this.inputBlur)
			//$("body").off("blur", self._selector, this.inputBlur)

			// report the results
			//$(self._selector).focus().select()
			this.$refs.theInput.focus({preventScroll:true})
			this.$refs.theInput.select()


			//this.onInputComplete(this.value)
			this.$emit('codeReader',this.value)

			this.resetValues()
		},
		
		resetValues() {
			// clear the variables
			this.inputStart = null
			this.inputStop = null
			this.firstKey = null
			this.lastKey = null

			// clear the results
			if (this.options.autoDel){
				this.value=''
			}
		
		},

		// Determine if the user is just typing slowly
		isUserFinishedEntering() {
			return !this.isScannerInput() && this.userFinishedEntering
		},

		// Assume that it is from the scanner if it was entered really fast
		isScannerInput() {
			return (((this.inputStop - this.inputStart) / this.value.length) < 15)
		}

	},
}


</script>