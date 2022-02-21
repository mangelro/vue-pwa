<template>
  <the-time></the-time>
  <employee-header :employeeId="id" :showOptions="true"></employee-header>

  <div class="signature-wrapper">
    <em>firma</em>  
    <VueSignaturePad ref="signaturePad" />
  </div>

  <div class="field textarea label border">
      <textarea v-model="model.observaciones"></textarea>
      <label>Observaciones</label>
  </div>

  <div class="field label border">
    <input type="password" v-model="model.pin">
    <label>PIN de firma</label>
  </div>


  <nav>
    <button @click="save">Firmar</button>
      <!-- <button @click="undo">Undo</button> -->
      <button @click="clear">Clear</button>
  </nav>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import model from '../models'


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
    model,
  }),
  
  methods:{
    undo() {
        this.$refs.signaturePad.undoSignature()
      },
      
    clear() {
        this.$refs.signaturePad.clearSignature()
        this.model.signature=''
        this.model.pin=''
        this.model.observaciones=''
        this.$refs.signaturePad.openSignaturePad()
      },
    
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      if (isEmpty||model.pin.length===0){
        window.alert('faltan datos')
        return
      }
      this.$refs.signaturePad.lockSignaturePad()
      this.model.signature=data
      this.model.date=(new Date()).toISOString()
      
      console.table(this.model)
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
