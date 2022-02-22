<template>


  <div class="row">

    <div class="col s12">
        <the-time></the-time>
    </div>

    <div class="col s12">
      <employee-header :employeeId="id" :showOptions="true"></employee-header>
    </div>
    

    <div class="col s12">
      <div class="signature-wrapper">
        <em>firma</em>  
        <VueSignaturePad ref="signaturePad" />
      </div>
    </div>

    <div class="col s12">
      <div class="field textarea label border">
          <textarea v-model="model.observations"></textarea>
          <label>Observaciones</label>
      </div>
    </div>

    <div class="col s12">
      <div class="field label border">
        <input type="password" v-model="model.pin">
        <label>PIN de firma</label>
      </div>
    </div>
</div>

  <nav>
    <button @click="save">Firmar</button>
      <!-- <button @click="undo">Undo</button> -->
      <button @click="clear">Clear</button>
  </nav>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import {registerModel} from '../models'
import {getCurrentPosition} from '../utils/Location'

export default {
  components: {
    TheTime: defineAsyncComponent(() => import('@/components/TheTime')),
    EmployeeHeader: defineAsyncComponent(() => import('../components/EmployeeHeader')),
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    model:registerModel,
  }),

  created(){
      this.model.employeeId=this.id
  },
  
  methods:{
    undo() {
        this.$refs.signaturePad.undoSignature()
      },
      
    clear() {
        this.$refs.signaturePad.clearSignature()
        this.model.signature=''
        this.model.pin=''
        this.model.observations=''
        this.$refs.signaturePad.openSignaturePad()
      },
    
    async save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()

      if (isEmpty||this.model.pin.length===0){
        window.alert('faltan datos')
        return
      }

      this.$refs.signaturePad.lockSignaturePad()

      this.model.signature=data
      this.model.date=(new Date()).toISOString()
      
      try{
        this.model.location=await getCurrentPosition({enableHighAccuracy: false})
      }
      catch(err){
        console.warn(err)
      }
      
      await this.$api.signature.postRegistro(this.model)
      
      //console.table(this.model)
    }
  },
  
  mounted(){
    // eslint-disable-next-line no-undef
    this.$nextTick(()=>ui())
  }
}
</script>

<style scoped>
   .signature-wrapper {
    border: 2px solid;
    border-color: var(--secondary);
    border-radius: 8rem;
    height: 30vh;
    margin:10px 0;
  } 

  .img-signatgure {
    margin-top: 100px;
    width: 150px;
    height: auto;
  }

</style>
