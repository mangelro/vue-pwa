<template>
	<div class="row">
		<div class="col s12"><h3>Justificación</h3></div>

		<div class="col s12">
			<employee-header :employeeId="id" :showOptions="false"></employee-header>
		</div>

		<div class="col s12">
			<div class="field label border">
				<input type="date" v-model="_justifyDate" />
				<label>Fecha justificación</label>
				<em>Máx. 10 días</em>
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
import { defineAsyncComponent } from '@vue/runtime-core'
import DropZone from '../components/DropZone'
import { justifyModel } from '../models'
import {DaysBetweenDates, nowUTC} from '../utils/DateHelper'

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

	computed: {
		_justifyDate: {
			get() {
				const y = this.justifyDate.getFullYear().toString()
				const m = (this.justifyDate.getMonth() + 1).toString().padStart(2, '0')
				const d = this.justifyDate.getDate().toString().padStart(2, '0')
				return `${y}-${m}-${d}`
			},
			set(value) {
				let [y, m, d] = value.split('-')
				this.justifyDate = new Date(Date.UTC(y, m - 1, d, 0, 0, 0))
			},
		},
	},

	watch: {
		justifyDate(newValue, oldValue) {

			if (!this._validJustifyDate(newValue)) {
				this.justifyDate = oldValue
				this.$refs.beerToast.warning('Solo son validas las justificaciones de los 10 dias anteriores',{msToHide:1500})
			} else {
				this.model.date = newValue.toISOString()
			}
		},
	},

	created() {
		this.model.employeeId = this.id
		this.model.date = this.justifyDate.toISOString()
	},

	methods: {
		/**
		 * Solo son validas las justificaciones de los 10 dias anteriores
		 */
		_validJustifyDate(justifyDate) {
			const days = DaysBetweenDates(new Date(),justifyDate)
			return days > 0 && days < 10
		},

		async save() {
			if (this.model.pin.length === 0 || this.model.justify.length===0) {
				this.$refs.beerToast.warning('Faltan algunos datos obligatorios',{msToHide:2000})
				return
			}

			try {
				const { contentUrl } = await this.$api.signature.postJustificacion(this.model)

				this.$refs.mydropzone.setUrl(contentUrl)
				this.$refs.mydropzone.processQueue()
				this.clear()
			} catch (err) {
				this.$refs.beerToast.error(err,{msToHide:2000})
			}
		},

		clear() {
			this.$refs.mydropzone.clearQueue()
			this.model.pin = ''
			this.model.justify = ''
			this.justifyDate = nowUTC()
		},
	},

	mounted(){
		// eslint-disable-next-line no-undef
		if (!window.ui) this.$nextTick(() => ui())
	}
}
</script>
