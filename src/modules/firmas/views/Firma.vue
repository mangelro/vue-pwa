<template>
	<div class="row">
		<div class="col s12">
			<the-time></the-time>
		</div>

		<div class="col s12">
			<employee-header :employeeId="id" :showOptions="true" ></employee-header>
		</div>
		<div class="col s12">
			<a class="chip border right-round bottom-round">{{dateToString}}</a>
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
				<input-password v-model="model.pin"></input-password>
				<label>PIN</label>
			</div>
		</div>


	</div>

	<nav>
		<button @click="save">Firmar</button>
		<button @click="clear">Clear</button>
	</nav>

	<Teleport to="body">	
		<beer-toast id="toastFirma" ref="beerToast"></beer-toast>
	</Teleport>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { nowUTC, toDateTimeString } from '@/utils/dateHelper'
import { defineAsyncComponent } from '@vue/runtime-core'
import { getCurrentPosition } from '../utils/Location'
import { registerModel } from '../models'

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

	computed:{
		...mapGetters('signatures',['lastSignature']),

		dateToString(){
			return toDateTimeString(this.lastSignature(this.id)?.date)
		}
	},

	watch:{
		id(){
			this.model.employeeId = this.id
		}
	},

	data: () => ({
		model: registerModel
	}),

	created() {
		this.model.employeeId = this.id
	},

	methods: {

		...mapActions('signatures',['saveSignature']),

		undo() {
			this.$refs.signaturePad.undoSignature()
		},

		clear() {
			this.$refs.signaturePad.clearSignature()
			this.model.signature = ''
			this.model.pin = ''
			this.model.observations = ''
			this.$refs.signaturePad.openSignaturePad()
		},

		async save() {
			const { isEmpty, data }=this.$refs.signaturePad.saveSignature()
			
			if (isEmpty || this.model.pin.length === 0) {
				this.$refs.beerToast.warning('Faltan algunos datos obligatorios',{msToHide:2000})
				return
			}

			this.$refs.signaturePad.lockSignaturePad()

			this.model.signature = data
			this.model.date = nowUTC()

			try{
				try {
					this.model.location = await getCurrentPosition({
						enableHighAccuracy: false,
					})
				} catch (err) {
					console.warn(err)
				}
				//TODO
				await this.saveSignature(this.model)
				this.clear()
			}
			catch (err){
				this.$refs.beerToast.error(err,{msToHide:2000})
			}
		},
	},

	mounted() {
		// eslint-disable-next-line no-undef
		this.$nextTick(()=>ui())
	}
}
</script>

<style scoped>
.signature-wrapper {
	border: 1px solid var(--on-background);
	border-radius: 10rem;
	height: 30vh;
	margin: 10px 0;
}

.signature-wrapper:hover{
	border: 1px solid var(--primary);
}

.img-signatgure {
	margin-top: 100px;
	width: 150px;
	height: auto;
}
</style>
