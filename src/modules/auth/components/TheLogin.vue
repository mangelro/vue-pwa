<template>
	<article class="no-padding">
		<img src="@/assets/login.png" class="responsive medium" />
		<div class="padding">
			<h5 class="no-margin">Acceso al sistema</h5>
			<div>
				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>account_circle</i>
							<input type="text" v-model.trim="model.username" />
							<label>Nombre de usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>password</i>
							<input-password v-model.trim="model.password"></input-password>
							<label>Clave de usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2"></div>
					<div class="col s10 m8">
						<label class="checkbox">
							<input type="checkbox" v-model="model.rememberMe">
							<span>Recordarme es en este equipo</span>
						</label>
					</div>
				</div>
			</div>

			<nav>
				<div class="row">
					<div class="col s12 m6"><button @click="authUser" class="responsive">Acceso</button></div>
					<div class="col s12 m6"><a href="javascript:void(0)" class="responsive">Recordar contraseña</a></div>
				</div>
			</nav>
		</div>
	</article>

</template>

<script>

import {loginModel} from '../models/auth.model'
import {mapActions} from 'vuex'

export default {
	data:() => ({
		errorForm:'',
		model:loginModel
	}),

	emits: ['logging', 'logged', 'loggingError'],

	methods: {

		...mapActions('auth',['login']),

		async authUser() {
			this.$emit('logging', this.model)

			try{
				await this.login(this.model)
				this.onLogin()
			}
			catch(error){
				this.errorForm=error
				this.onError()
			}
		},

		onLogin() {
			this.$emit('logged',this.model)
		},
		
		onError() {
			this.model.password = ''
			this.$emit('loggingError', this.errorForm)
		},
	},

	// mounted() {
	// 	// eslint-disable-next-line no-undef
	// 	this.$nextTick(() => ui())
	// },
}
</script>
