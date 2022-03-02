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
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
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

	created(){
		this.loadAllEmployees()
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
