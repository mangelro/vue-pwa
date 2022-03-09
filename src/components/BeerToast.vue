<script>
import {DEFAULT_OPTIONS, POSITIONS, TYPES} from '../utils/toastOptions'
import {defineComponent, h} from 'vue'

export default defineComponent({
	name: 'BeerToast',

	props:{
		id:{
			type:String,
			required:true,
		}
	},

	data: () => ({
		options:DEFAULT_OPTIONS, 
		message: 'I need a message ',
		classToast: {
			top:false,
			pink: false,
			orange: false,
			green: false,
			blue: false,
		},
	}),

	expose:['done','error','info','warning'],

	methods: {
		show(message, options = {}) {
			
			const localOptions = {
				...this.options,
				...options,
			}

			this.options=localOptions

			this.configureClass(localOptions)
			this.message = message

			// eslint-disable-next-line no-undef
			this.$nextTick(()=>ui(`#${this.id}`, localOptions.msToHide))
		},

		configureClass(options){
			this.classToast.pink = options.type === TYPES.ERROR
			this.classToast.orange = options.type === TYPES.WARNING
			this.classToast.green = options.type === TYPES.DONE
			this.classToast.blue = options.type === TYPES.INFO
			this.classToast.top= options.position === POSITIONS.TOP
		},

		done(message, options = {}) {
			options.type = TYPES.DONE
			return this.show(message, options)
		},

		error(message, options = {}) {
			options.type = TYPES.ERROR
			return this.show(message, options)
		},

		info(message, options = {}) {
			options.type = TYPES.INFO
			return this.show(message, options)
		},

		warning(message, options = {}) {
			options.type = TYPES.WARNING
			return this.show(message, options)
		},
	},

	render() {
		const { id, options, message,classToast } = this

		return h(
			'div',
			{
				id,
				role: 'alert',
				class: ['toast', 'white-text', classToast] ,
			},
			[
				h('i', { innerText: options.type }), 
				h('span', { innerText: message })
			]
		)
	},
})
</script>
