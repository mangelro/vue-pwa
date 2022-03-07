<template>
	<input 
		type="text"
		:value="maskText" 
		@input="keyboardInputHandle"
		@change="$emit('update:modelValue', realText)">
</template>

<script>
export default {
	props: {
		modelValue:{
			type:String,
			required:true
		},
		pattern:{
			type:String,
			required:false,
			default:'•',
			validator: (value) => value.length===1
			
		},
		delay:{
			type:Number,
			required:false,
			default:800,
			validator:(value) => value > 0
		}
	},
	
	emits: ['update:modelValue'],

	data: ()=>({
		realText:'',	//Valor real
		maskText:'',
		delayed:{
			execute: function (cb, arg) {
				cb(arg)
				delete this.timeoutID
			},
			start: function (cb, arg, delay) {
				this.cancel()
				const self = this
				this.timeoutID = window.setTimeout(() => {
					self.execute(cb, arg)
				}, delay)
			},
			cancel: function () {
				if (typeof this.timeoutID == 'number') {
					window.clearTimeout(this.timeoutID)
					delete this.timeoutID
				}
			},
		}
	}),

	watch:{
		modelValue(newValue){
			this.maskText= this.pointGen(this.pattern,newValue.length)
		}
	},

	methods:{
		/**
		 * Generador de mñascara de password
		 */
		pointGen(pattern, num) {
			return Array.apply(null, Array(num))
				.map(function () {
					return pattern
				})
				.join('')
		},

		/**
		 * 
		*/
		delayEffect(arg) {
			arg.value = this.pointGen(this.pattern, arg.value.length)
		},

		keyboardInputHandle(e) {
			const preVal = this.realText
			
			// insert cursor location
			const index = e.target.selectionStart
			const nowVal = e.target.value
			// increase length of input's value
			const incre = nowVal.length - preVal.length
	
			// increase text
			if (incre > 0) {
				const newStr = nowVal.slice(index - incre, index)
				this.realText = preVal.slice(0, index - incre) + newStr + preVal.slice(index - incre)
				// delete text
			} else if (incre < 0) {
				this.realText = preVal.slice(0, index) + preVal.slice(index - incre)
			}

			// render mask effect
			if (nowVal.length > 0) {
				//e.target.value = this.pointGen(this.pattern, nowVal.length - 1) + nowVal.charAt(nowVal.length - 1)
				this.maskText = this.pointGen(this.pattern, nowVal.length - 1) + nowVal.charAt(nowVal.length - 1)
				this.delayed.start(this.delayEffect.bind(this), e.target, this.delay)
			}
			// reset insert cursor location
			e.target.setSelectionRange(index, index)
		}
	},
	
	// mounted() {
	// 	// eslint-disable-next-line no-undef
	// 	ui()
	// },
	
}
</script>