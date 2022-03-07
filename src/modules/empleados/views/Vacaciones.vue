<template>
	<div class="row">
		<div class="col s12"><h3>Vacaciones y permisos</h3></div>

		<div class="col s12 m6">
			<div class="field label border">
				<input-date v-model="iniPeriodo" />
				<label class="active">Fecha inicio periodo</label>
				<em>{{ toDateStringIni }}</em>
			</div>
		</div>

		<div class="col s12 m6">
			<div class="field label border">
				<input-date v-model="finPeriodo" />
				<label class="active">Fecha fin periodo</label>
				<em>{{ toDateStringFin }}</em>
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
				<select v-model="tipoPeriodo">
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
		<!-- <button @click="undo">Undo</button> -->
		<button @click="clear">Clear</button>
	</nav>
</template>

<script>
import { PERIODOS } from '../utils/Periodos'
import { DaysBetweenDates } from '@/utils/DateHelper'

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
		iniPeriodo: new Date(),
		finPeriodo: new Date(),
		tipoPeriodo: '',
		permisos: PERIODOS,
	}),
	computed: {
		diasPeriodo() {
			const days = DaysBetweenDates(this.iniPeriodo, this.finPeriodo)
			return days + (days===1? ' día': ' días')
		},
		toDateStringIni() {
			return this.iniPeriodo.toLocaleDateString('es-ES', options)
		},
		toDateStringFin() {
			return this.finPeriodo.toLocaleDateString('es-ES', options)
		},
	},

	methods: {
		clear() {
			this.iniPeriodo = new Date()
			this.finPeriodo = new Date()
		},
	},

	// mounted() {
	// 	// eslint-disable-next-line no-undef
	// 	this.$nextTick(() => ui())
	// },
}
</script>

<style scoped>
em{
	display:inline-block;
	height: 15px;
	
}
</style>