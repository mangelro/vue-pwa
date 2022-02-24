<template>
	<article>
		<div class="row no-wrap">
			<div class="col min">
				<img :src="picture" class="circle large" />
			</div>
			<div class="col">
				<h5 class="no-margin">{{ name }}</h5>

				<button
					data-ui="#dropdown1_"
					class="circle mail-settings"
					v-if="showOptions">
					<i>settings</i>
					<div
						id="dropdown1_"
						data-ui="#dropdown1_"
						class="dropdown left no-wrap">

						<router-link :to="{ name: 'Justificacion', params: { id: employeeId } }">Justificar falta</router-link>
						<a>Solicitar nuevo PIN</a>
						<router-link :to="{ name: 'Usuarios', params: { id: employeeId } }">Modificar datos</router-link>
					</div>
				</button>
				<div style="margin-top: 15px">
					<i class="small">local_phone</i>{{ phone }}&nbsp;<i class="small"
						>mail</i
					>{{ email }}
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: {
		employeeId: {
			type: String,
			required: true,
		},

		showOptions: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data: () => ({
		picture: '',
		name: '',
		phone: '',
		email: '',
	}),

	computed: {
		...mapGetters('employees', ['getEmployeById']),
	},

	watch: {
		employeeId() {
			this.loadEmployee()
		},
	},

	methods: {
		loadEmployee() {
			const { name, picture, phone, email } = this.getEmployeById(
				this.employeeId
			)

			this.name = name
			this.picture = picture
			this.phone = phone
			this.email = email
		},
	},

	created() {
		this.loadEmployee()
	},

	mounted() {
		// eslint-disable-next-line no-undef
		this.$nextTick(() => ui())
	},
}
</script>

<style scoped>
.mail-settings {
	position: absolute;
	top: 2px;
	right: 0;
}
</style>
