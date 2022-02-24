<template>
	<img src="../assets/Signup.svg" class="responsive medium" />
	
    <div class="padding">
		<h5 class="no-margin">Acceso </h5>
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
						<input type="password" v-model="pass" />
						<label>Clave de usuario</label>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col s1 m2"></div>
				<div class="col s10 m8">
					<label class="switch">
						<input type="checkbox" v-model="rememberMe" />
						<span>Recordarme en este equipo</span>
					</label>
				</div>
			</div>
		</div>

		<nav>
			<div class="col s2 m2">&nbsp;</div>
			<div class="col s9"><button @click="authUser" class="large-width center-aling">Acceso</button></div>
		</nav>

		<div class="row">
			<div class="col s12 m6 center-align">Olvidó su clave</div>
			<div class="col s12 m6 center-align"></div>
        </div>
    </div>

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
