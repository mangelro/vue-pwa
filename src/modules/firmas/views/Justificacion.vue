<template>
  <employee-header :employeeId="id" :showOptions="false"></employee-header>
</template>

<script>

import { defineAsyncComponent } from "@vue/runtime-core";

export default {
  
  components: {
    EmployeeHeader: defineAsyncComponent(() => import('../components/EmployeeHeader')),
  },

	props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>