<template>
  <the-time></the-time>
  <article>
    <div class="row no-wrap">
      <div class="col min">
        <img :src="employeePicture" class="circle large">
      </div>
      <div class="col">
        <h5 class="no-margin">{{ employeeName }}</h5><a class="user-settings"><i>settings</i></a>
        <div>Complementary text</div>
      </div>
    </div>
  </article>
  <div class="signature-wrapper">
    <em>firma</em>  
    <VueSignaturePad ref="signaturePad" />
  </div>

  <div class="field label border">
    <input type="password" v-model="model.pin">
    <label>PIN de firma</label>
  </div>
 


  <div>
    <button @click="save">Firmar</button>
      <!-- <button @click="undo">Undo</button> -->
      <button @click="clear">Clear</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import model from '../models'



export default {
  components: {
    TheTime: defineAsyncComponent(() => import("@/components/TheTime")),
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  watch: {
    id() {
      this.loadEmployee()
      this.clear()
    },
 
  },

  created(){
    this.loadEmployee()
  },

  data: () => ({
    imageData: '',
    // employeePIN:'',
    employeeName: '',
    employeePicture:'',
    model,
  }),

  computed: {
    ...mapGetters("employees", ["getEmployeById"]),
  },

  methods: {
    loadEmployee(){
      const { name, picture} = this.getEmployeById(this.id)
      this.employeeName = name
      this.employeePicture=picture
      this.model.id=this.id
    },

    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    
    clear() {
      this.$refs.signaturePad.clearSignature()
      // this.imageData=''
      // this.employeePIN=''
      this.model.signature=''
      this.model.pin=''
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
  .user-settings{
    position: absolute;
    top:2px;
    right:0;
  }
</style>
