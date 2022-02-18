<template>
  <nav-bar></nav-bar>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
  components:{
    NavBar: defineAsyncComponent(()=> import ('./components/TheNavBar.vue'))
  },

 
}
</script>