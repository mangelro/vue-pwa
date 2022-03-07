<template>
	<form
		:action="innerUrl"
		class="dropzone"
		id="dropzone"
		enctype="multipart/form-data">
		
		<!-- Now setup your input fields -->
		<slot :files="filesToProcess"></slot>

		<!-- this is were the previews should be shown. -->
		<div class="previews dropzone-previews"></div>
	</form>
</template>

<script>

import Dropzone from 'dropzone'
import msg from '../utils/DropZoneMsg'
import { isAbsoluteUrl } from '../utils/UrlHelper'

Dropzone.autoDiscover = false

export default {
	props: {
		url: {
			type: String,
			required: true,
			validator: (value) => {
				return isAbsoluteUrl(value)
			},
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
			innerUrl: this.url,
			filesToProcess: [],
		}
	},

	watch: {
		innerUrl(newValue) {
			if (!this.myDropzone) return

			this._throwIfNotAbsoluteUrl(newValue)
			this.myDropzone.options.url = newValue
		},
	},

	mounted() {
		this.myDropzone = new Dropzone('#dropzone', {
			url: this.innerUrl,
			method: 'put',

			paramName: this.trickParamName, // The name that will be used to transfer the file

			previewsContainer: '.previews', // Defines where to display the file previews

			maxFilesize: 100, // MB

			uploadMultiple: this.maxFiles > 1,
			maxFiles: this.maxFiles,

			parallelUploads: 20,

			addRemoveLinks: true,

			//chunking:true,
			// acceptedFiles: "image/*",

			acceptedFiles: this.acceptedFiles,
			autoProcessQueue: false, //se necesita llamar explicitamente a .processQueue() para subir los ficheros.)

			//headers:{'x-api-version':'1.0'},

			//Mensajes importados
			...msg,
		})

		this.myDropzone.on('addedfile', this.onFileAdded)
		this.myDropzone.on('removedfile', this.onRemovedFile)
		this.myDropzone.on('complete', this.onCompleted)
	},

	emits: ['uploadingCompleted', 'fileAdded', 'preProcessQueue'],

	expose:['setUrl','processQueue','clearQueue'], //Define métodos públicos

	methods: {
		/**
		 *  Pequeño truco para evitar que le añada [n] a los parámetros con el
		 *  nombre de los ficheros en subidas multiples
		 */
		trickParamName() {
			return this.maxFiles > 1 ? 'files' : 'file'
		},

		/**
		 * Verifica que la url es un ruta absoluta
		 */
		throwIfNotAbsoluteUrl(url) {
			if (isAbsoluteUrl(url)) throw `Url no válida ${url}`
		},

		onFileAdded(file) {
			// file.previewElement.addEventListener("click", () => {
			//   this.myDropzone.removeFile(file)
			// })
			this.$emit('fileAdded', file)
		},

		onRemovedFile(file) {
			console.log('File removed', file.name)
		},


		/**
		 * Evento que se proudce por cada uno de los ficheros procesados
		 */
		onCompleted(file) {
			console.log('File Uploading Completed', file)
			this.$emit('uploadingCompleted', file)
			setTimeout(() => this.myDropzone.removeFile(file), 5000)
		},

		/**
		 * Establece una nueva url para el envío de ficheros.
		 */
		setUrl(url) {
			this.throwIfNotAbsoluteUrl(url)
			this.innerUrl = url
		},

		/**
		 * Procesa la cola de ficheros
		 */
		processQueue() {
			console.log('Pre-Process Queue', this.myDropzone)
			this.filesToProcess = this.myDropzone.files
			this.$emit('preProcessQueue', this.myDropzone.files)

			console.log('Process Queue', this.myDropzone)

			this.$nextTick(() => this.myDropzone.processQueue())
		},

		/**
		 * Limpia la cola de ficheros
		 */
		clearQueue() {
			console.log('Clear Queue', this.myDropzone.files)
			this.myDropzone.files.forEach((f) => this.myDropzone.removeFile(f))
		},
	},
}
</script>

<style scoped></style>
