<template>
	<div class="row">
		<div class="col s12"><h3>Justificación</h3></div>

		<div class="col s12">
			<employee-header :employeeId="id" :showOptions="true"></employee-header>
		</div>

		<div class="col s12">
			<div class="field label border">
				<input-date v-model="justifyDate" />
				<label class="active">Fecha justificación</label>
				<div class="tooltip">{{ toDateString }} (Máx. 10 días)</div>
			</div>
		</div>

		<div class="col s12">
			<div class="field textarea label border">
				<textarea v-model="model.justify"></textarea>
				<label>Causa justificación</label>
			</div>
		</div>

		<div class="col s12">
			<drop-zone url="http://upload" :maxFiles="3" ref="mydropzone"></drop-zone>
			<em>Máx. 3 archivos</em>
		</div>

			<div class="col s12">
			<div class="field label border">
				<input-password v-model="model.pin"  maxlength="4"></input-password>
				<label>PIN</label>
			</div>
		</div>

	</div>
	<nav>
		<button @click="save">Justificar</button>
		<button @click="clear">Clear</button>
	</nav>
	<Teleport to="body">
		<beer-toast id="toastJustificacion" ref="beerToast"></beer-toast>
	</Teleport>
</template>

<script>

import * as DateUtils from '@/utils/dateHelper'
import {defineAsyncComponent} from '@vue/runtime-core'
import DropZone from '../components/DropZone'
import {justifyModel} from '../models'

export default {
	components: {
		EmployeeHeader: defineAsyncComponent(() =>
			import('../components/EmployeeHeader')
		),
		DropZone,
	},

	props: {
		id: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		justifyDate: new Date(),
		model: justifyModel,
	}),

	computed:{
		toDateString(){
			return DateUtils.toDateTimeString(this.justifyDate,{hour:null,minute:null})
		}
	},

	watch: {
		justifyDate(newValue) {

			if (!this.validJustifyDate(newValue)) {
				this.$refs.beerToast.warning('Solo son válidas las justificaciones de los 10 dias anteriores',{msToHide:1500})
				this.justifyDate = DateUtils.nowUTC()

			} else {
				this.model.date = newValue
			}
		},
	},

	created() {
		this.model.employeeId = this.id
		this.model.date = this.justifyDate.toISOString()
	},

	methods: {
		/**
		 * Solo son válidas las justificaciones de los 10 dias anteriores
		 */
		validJustifyDate(justifyDate) {
			const days = DateUtils.daysBetweenDates(justifyDate,DateUtils.nowUTC())
			return days > 0 && days < 10
		},

		async save() {

			if (this.model.pin.length === 0 || this.model.justify.length===0) {
				this.$refs.beerToast.warning('Faltan algunos datos obligatorios',{msToHide:2000})
				return
			}

			try {
				const { contentUrl } = await this.$api.signature.registroJustificacion(this.model)
				
				this.$refs.mydropzone.processQueue(contentUrl)

				this.clear()

			} catch (err) {
				this.$refs.beerToast.error(err,{msToHide:12000})
			}
		},

		clear() {
			//this.$refs.mydropzone.clearQueue()
			this.model.pin = ''
			this.model.justify = ''
			this.justifyDate = DateUtils.nowUTC()
		},
	},

	mounted(){
		// eslint-disable-next-line no-undef
		this.$nextTick(()=>ui())
	}
}
</script>
