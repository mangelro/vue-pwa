
<script>
import {h, defineComponent } from 'vue'

export default defineComponent({

	name:'BeerLoader',

	data:()=>({
		showLoading:true
	}),
	
	expose:['showLoader'],

	methods:{
		showLoader(){
			console.log('muestra')
		}
	},

	mounted(){
		setInterval(()=>{this.showLoading=false},1500)
	},

	render(){
		return h('a',{
			class:['loader','medium'],
		})
	}

})
</script>