<template>
	<details ref="employeesExpand">
		<summary><i>people</i><span>Empleados</span></summary>
		<p>Selecionate.</p>
			<a
				class="chip round large"
				v-for="item in getAllEmployees"
				:key="item.id"
				@click="onClick(item.id)">
				<img :src="item.picture" />
				<span>{{ item.name }}</span>
			</a>
	</details>
	<Teleport to="body">	
		<beer-toast id="toastFirma" ref="beerToast"></beer-toast>
	</Teleport>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
//import ListBase from '@/components/base/ListBase'

export default {
	components: {
		//ListBase
	},

	data: () => ({}),

	computed: {
		...mapGetters('employees', ['getAllEmployees']),
	},

	emits:['selectedEmployee'],

	methods:{

		...mapActions('employees',['loadAllEmployees']),

		onClick(id){
			
			setTimeout(()=>{
				this.$refs.employeesExpand.removeAttribute('open')
			},200)
			
			this.$router.push({ name: 'Firma', params: {id} })
			
			this.$emit('selectedEmployee')			
		}
	},

	async created(){
		try{
			await this.loadAllEmployees()
		}
		catch(error)
		{
			this.$refs.beerToast.error(error,{msToHide:2000})
		}
		
	}
	
}
</script>

<style scoped>
a {
	margin: 5px;
}
summary span{
	font-size:20rem;
	margin:0;
	padding:0;
}
</style>
