<template>
   <form
    :action="url"
    class="dropzone"
    id="dropzone"
    enctype="multipart/form-data">

    <!-- Now setup your input fields -->
    <slot name="input" :files="filesToProcess"></slot>

    <!-- this is were the previews should be shown. -->
    <div class="previews dropzone-previews"></div> 
  </form> 
</template>


<script>
//eslint-disable-line
import Dropzone from 'dropzone' 
import msg from '../utils/DropZoneMsg'

Dropzone.autoDiscover = false;

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    maxFiles: {
      type: Number,
      required: false,
      default: 1,
    },
    acceptedFiles: {
      type: String,
      requred: false,
    },
  },

  data() {
    return {
      myDropzone: null,
      filesToProcess:[]
    }
  },

  mounted() {

    this.myDropzone = new Dropzone("#dropzone", {

      url:this.url,

      paramName: this._trickParamName, // The name that will be used to transfer the file
      
      previewsContainer:'.previews', // Defines where to display the file previews

      maxFilesize: 100, // MB

      uploadMultiple:this.maxFiles > 1,
      maxFiles: this.maxFiles,

      parallelUploads: 20,

      addRemoveLinks:true,
      
      //chunking:true,
      // acceptedFiles: "image/*",

      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: false, //se necesita llamar explicitamente a .processQueue() para subir los ficheros.)

      //headers:{'x-api-version':'1.0'},

      //Mensajes importados
      ...msg, 

    })

    this.myDropzone.on("addedfile", this.onFileAdded)
    this.myDropzone.on("removedfile", this.onRemovedFile)
    this.myDropzone.on("complete", this.onCompleted)
  },
  
  // beforeUnmount(){
  //   this.dropzone.destroy();
  // },

  emits:['uploadingCompleted','fileAdded','preProcessQueue'],

  methods: {
    /**
     *  Pequeño truco para evitar que le añada [n] a los parámetros con el
     *  nombre de los ficheros en subidas multiples
     */
    _trickParamName() {
      return this.maxFiles > 1? "files":"file"
    },

    onFileAdded(file) {
      // file.previewElement.addEventListener("click", () => {
      //   this.myDropzone.removeFile(file)
      // })
      this.$emit('fileAdded',file)
    },

    onRemovedFile(file) {
      console.log("File removed", file.name)
    },

    /**
     * Evento que se proudce por cada uno de los ficheros procesados
     */
    onCompleted(file){
      console.log("File Uploading Completed",file)
      this.$emit('uploadingCompleted',file)
      setTimeout(() => this.myDropzone.removeFile(file),5000)
    },

    /**
     * Procesa la cola de ficheros
     */
    processQueue() {
      console.log("Pre-Process Queue", this.myDropzone)
      this.filesToProcess=this.myDropzone.files
      this.$emit('preProcessQueue',this.myDropzone.files)
      console.log("Process Queue", this.myDropzone)

      this.$nextTick(()=>this.myDropzone.processQueue())
      
    },

    /**
     * Limpia la cola de ficheros
     */
    clearQueue(){
      console.log("Clear Queue", this.myDropzone.files)
      this.myDropzone.files.forEach(f=>this.myDropzone.removeFile(f))
    }

  },
}
</script>

<style scoped>
</style>