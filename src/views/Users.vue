<template>
	<h3>Usuarios</h3>

	<div class="row">
		<div class="col s12">
			<!-- <custom-input :modelValue="searchText" @update:modelValue="(newValue)=> searchText=newValue" ></custom-input> -->
			<custom-input v-model.capitalize="searchText"></custom-input>
			<!-- <custom-input-2 v-model="searchText"></custom-input-2> -->
			<!-- <custom-input-3 v-model:search="searchText"></custom-input-3> -->

			<suspense>
				<template #default>
					<p>{{foundText}}</p>
				</template>
				<template #fallback>
					<p>Loading...</p>
				</template>
			</suspense>
		</div>

		<div class="col s12">
			<the-user v-model:firstName="user.name" v-model:lastName="user.surname" ></the-user>
			<br><em>{{user.surname}}, {{user.name}}</em>
		</div>
	</div>
</template>

<script>
import CustomInput from '../components/CustomInput.vue'
//import CustomInput2 from '../components/CustomInput2'
//import CustomInput3 from '../components/CustomInput3'
import TheUser from '../components/TheUser.vue'
import searching from '../api/searchApi'

export default {
	components: { 
		CustomInput, 
		//CustomInput2,
		//CustomInput3,
		TheUser,
	},
	
	data:()=>({
		searchText:'',
		foundText:'',
		user:{
			name:'',
			surname:''
		}
	}),

	watch:{
		async searchText(newValue){
			this.foundText=await searching(newValue)
			console.log(this.foundText)
		}
	},

	mounted(){
		// eslint-disable-next-line no-undef
		this.$nextTick(()=>ui())
	}
}
</script>