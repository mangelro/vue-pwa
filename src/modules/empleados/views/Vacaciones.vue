<template>
	<div class="row">
		<div class="col s12"><h3>Vacaciones y permisos</h3></div>

		<div class="col s12 m6">
			<div class="field label border">
				<input-date v-model="model.iniPeriodo" />
				<label class="active">Fecha inicio periodo</label>
				<div class="tooltip">{{ toDateStringIni }}</div>
			</div>
		</div>

		<div class="col s12 m6">
			<div class="field label border">
				<input-date v-model="model.endPeriodo" />
				<label class="active">Fecha fin periodo</label>
				<div class="tooltip">{{ toDateStringFin }}</div>
			</div>
		</div>

		<div class="col s12 m2">
			<div class="field label border">
				<input type="text" :value="diasPeriodo" readonly="readonly" />
				<label class="active">Días periodo</label>
			</div>
		</div>


		<div class="col s12 m10">
			<div class="field label suffix border">
				<select v-model="model.tipoPeriodo">
					<option
						v-for="(permiso, index) in permisos"
						:key="index"
						:value="permiso.value"
					>
						{{ permiso.text }}
					</option>
				</select>
				<label class="active">Tipo de permiso</label>
				<i>arrow_drop_down</i>
			</div>
		</div>
	</div>
	<nav>
		<button @click="save">Registrar</button>
		<button @click="clear">Clear</button>
	</nav>
</template>

<script>
import { PERIODOS } from '../utils/Periodos'
import { DaysBetweenDates, nowUTC } from '@/utils/DateHelper'
import {vacacionesModel} from '../models'

const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}

export default {
	props: {
		id: {
			type: String,
			required: false,
		},
	},

	data: () => ({
		model:vacacionesModel,
		permisos: PERIODOS,
	}),
	computed: {
		diasPeriodo() {
			const days = DaysBetweenDates(this.model.iniPeriodo, this.model.endPeriodo)
			return days + (days===1? ' día': ' días')
		},
		toDateStringIni() {
			return this.model.iniPeriodo.toLocaleDateString('es-ES', options)
		},
		toDateStringFin() {
			return this.model.endPeriodo.toLocaleDateString('es-ES', options)
		},
	},

	methods: {
		save(){
			console.log(this.model.iniPeriodo.toISOString())
		},

		clear() {
			this.model.iniPeriodo = nowUTC()
			this.model.endPeriodo = nowUTC()
		},
	},

	mounted() {
		// eslint-disable-next-line no-undef
		this.$nextTick(()=>ui())
	},
}
</script>

<style scoped>
em{
	display:inline-block;
	height: 15px;
	
}
</style>