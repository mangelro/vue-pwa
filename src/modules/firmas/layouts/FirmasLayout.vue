<template>
	<div class="row">
		<div class="col s12 m4">
			<employees-list></employees-list>
		</div>
		<div class="col s12 m8">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
//import API from '../api/signatureApi'

export default {
	components:
	{
		EmployeesList: defineAsyncComponent(()=> import('../components/EmployeesList.vue'))
	},

	created(){
		// const api = API()
		// api.getLastSignatureById('ss')
	}
}
</script>