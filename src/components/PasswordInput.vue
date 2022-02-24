import ListBase from '@/components/base/ListBase';
<template>
	<div class="field label border">
		<input :value="maskValue" 
			@input="onInput"
			@change="$emit('update:modelValue',this.rawValue)">
	</div>
</template>

<script>
export default {
	props: ['modelValue'],
	emits: ['update:modelValue'],

	watch:{
		modelValue(newValue){
			this.rawValue=newValue
		},
		
		rawValue(){
			setTimeout(()=>{
				this.maskValue='❌'.repeat(this.rawValue.length)
			},500)
		}
	},

	data:()=>({
		maskValue:'',
		rawValue:''
	}),

	methods:{
		onInput(e){
			const {data} = e
			const {inputType} =e
			
			
			if (inputType==='deleteContentBackward'){
				this.rawValue = this.rawValue.substring(this.rawValue.length-1,this.rawValue.length)
				this.maskValue =this.rawValue.substring(this.rawValue.length-1,this.rawValue.length)
			}else{
				this.rawValue += data
				this.maskValue +=data
			}
		}
	}

	
}
</script>
