<template>
	<article class="no-padding">
		<img src="@/assets/Signup.svg" class="responsive medium" />
		<div class="padding">
			<h5 class="no-margin">Registro</h5>
			<div>
				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>account_circle</i>
							<input type="text" v-model="model.username" />
							<label>Nombre de usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>email</i>
							<input type="text" v-model="model.email" />
							<label>Email usuario</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>password</i>
							<input-password  v-model="model.password"></input-password>
							<label>Clave de acceso</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s1 m2">&nbsp;</div>
					<div class="col s10 m8">
						<div class="field label prefix">
							<i>password</i>
							<input-password v-model="newPass"></input-password>
							<label>Repetir clave</label>
						</div>
					</div>
				</div>


				<nav>
					<div class="row">
						<div class="col s12 m6"><button @click="registerUser" class="large-width center-aling">Sign Up</button>
						</div>
					</div>
				</nav>

				<div class="row">
					<div class="col s12 m6 center-align">
						¿Posee ya cuenta?
						<router-link :to="urlLogin">Sign In</router-link>
					</div>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import { RegisterModel } from '../models/auth.model'
import {mapActions} from 'vuex'

export default {
	props: {
		urlLogin: {
			type: [String, Object],
			default: '/login',
		},
	},
	data() {
		return {
			model:RegisterModel,
			newPass:'',
			errorForm: '',
		}
	},
	
	emits:['Register','RegisterError'],

	methods: {
		...mapActions('auth',['register']),

		async registerUser() {
			try{
				if (this.verifyPass())
				{
					await this.register(this.model)
					this.onRegisted()
				}
				else
				{
					this.errorForm='La clave no coincide'
					this.onError()
				}

			}
			catch(error)
			{
				this.errorForm=error
				this.onError()
			}
		},
		
		onRegisted(){
			this.$emit('Register', this.model)
		},

		onError(){
			this.newPass=''
			this.$emit('RegisterError', this.errorForm)
		},

		verifyPass(){
			console.log(this.model.password,this.newPass)
			return this.model.password===this.newPass
		}

	},
	mounted() {
		// eslint-disable-next-line no-undef
		this.$nextTick(() => ui())
	},
}
</script>