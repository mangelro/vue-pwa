<template>
  <div class="row">
  
    <div class="col s12"><h3>Justificación</h3></div>

    <div class="col s12">
      <employee-header :employeeId="id" :showOptions="false"></employee-header>
    </div>

    <div class="col s12">
       <div class="field label border">
        <input type="date" v-model="_justifyDate">
          <label>Fecha justificación</label>
      </div>
    </div>

	<div class="col s12">
		<div class="field textarea label border">
			<textarea v-model="model.justify"></textarea>
			<label>Causa justificación</label>
		</div>
	</div>


    <div class="col s12">
		<drop-zone url="http://localhost:50443/v2/upload" :maxFiles="3"  ref="mydropzone"></drop-zone>
		<em>Máx. 3 archivos</em>
    </div>

   
    <div class="col s12">
      <div class="field label border">
        <input type="password"  v-model="model.pin" maxlength="4">
          <label>PIN de firma</label>
      </div>
    </div>
  </div>
  
  <nav>
    <button @click="justify">Justificar</button>
    <button @click="clear">Clear</button>
  </nav>

</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core"
import DropZone from '../components/DropZone'
import {justifyModel} from '../models'


export default {
  
	components: {
		EmployeeHeader: defineAsyncComponent(() => import('../components/EmployeeHeader')),
		DropZone,
	},

	props: {
		id: {
		type: String,
		required: true,
		},
	},

	data: ()=>({
		justifyDate:new Date(),	
		model:justifyModel,
	}),

	computed:{
		_justifyDate:{
			get(){
				const y=this.justifyDate.getFullYear().toString()
				const m=(this.justifyDate.getMonth()+1).toString().padStart(2,'0')
				const d=this.justifyDate.getDate().toString().padStart(2,'0')
				
				console.log(y,m,d)
				
				return `${y}-${m}-${d}`  

			},
			set(value){
				let [y, m, d] = value.split('-');
				this.justifyDate = new Date(Date.UTC(y,m-1,d,0,0,0))
				//this.model.date=this.justifyDate.toISOString()
			}
		}
	},

	watch:{
		justifyDate(newValue,oldValue){

			if (!this._checkJustifyDate(newValue)){
				this.justifyDate=oldValue
			}
			else
			{
				this.model.date=newValue.toISOString()
			}
		}
	},

	created(){
		this.model.employeeId=this.id
		this.model.date=this.justifyDate.toISOString()

	},
   
	methods:{
		/**
		 * Solo son validas las justifivaciones en el mismo més
		 */
		_checkJustifyDate(justifyDate){
			const currentDate=new Date()
			const valido=  (justifyDate<=currentDate) && 
					(currentDate.getMonth()===justifyDate.getMonth()) && 
					(currentDate.getFullYear()===justifyDate.getFullYear())

			console.log(valido)
			return valido					
		},
		async justify(){

			if (this.model.pin.length===0){
				window.alert('faltan datos')
				return
			}

			try{
				const {contentUrl} = await this.$api.signature.postJustificacion(this.model)

				this.$refs.mydropzone.url=contentUrl
				this.$refs.mydropzone.processQueue()
			} 
			catch (err)
			{
				console.log(err)
			}
		},

		clear(){
			this.$refs.mydropzone.clearQueue()
			this.model.pin=''
			this.model.justify=''
			this.justifyDate=new Date()

		},
  
		onFileUploadingCompleted({name,status}){
			console.log('event onFileUploadingCompleted',name,status)
		},
  }
}
</script>
