<template>

	<article class="no-padding">
		<img src="../assets/login.png" class="responsive medium" />
		<div class="padding">
			<h5 class="no-margin">Acceso al sistema</h5>
			
			<div>
				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>account_circle</i>
							<input type="text" v-model.trim="name" />
							<label>Nombre de usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>password</i>
							<input type="password" v-model.trim="pass" />
							<label>Clave de usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2"></div>
					<div class="col s10 m8">
						<label class="checkbox">
							<input type="checkbox" v-bind="rememberMe">
							<span>Recordarme es en este equipo</span>
						</label>
					</div>
				</div>
			</div>

			<nav>
				<div class="row">
					<div class="col s12 m6"><button @click="authUser" class="responsive">Acceso</button></div>
					<div class="col s12 m6"><a href="void(0)" class="responsive">Recordar contraseña</a></div>
				</div>
			</nav>
		</div>
	</article>

</template>

<script>

export default {
	data:() => ({
		errorForm:'',
		name:'',
		pass:'',
		rememberMe:false,
	}),


	emits: ['logging', 'logged', 'loggingError'],

	methods: {
		async authUser() {
			this.$emit('logging', this.model)

			if (await this.$api.auth.signIn({
				name:this.name,
				pass:this.pass,
				rememberMe:this.rememberMe
			})) {
				this.onLogin()
			} else {
				this.onError()
			}
		},

		onLogin() {
			this.$emit('logged', this.model)
		},
		onError() {
			this.errorForm = 'Usuario o clave no válida'
			this.pass = ''
			this.$emit('loggingError', this.errorForm)
		},
	},

	mounted() {
		// eslint-disable-next-line no-undef
		this.$nextTick(() => ui())
	},
}
</script>
