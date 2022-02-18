<template>
  <a class="chip round large" v-for="item in getAllEmployees" :key="item.id" @click="$router.push({name:'Firma',params:{id:item.id}})">
    <img :src="item.picture" > 
    <span>{{item.name}}</span>
  </a>

</template>

<script>
import {mapGetters} from 'vuex'
//import ListBase from '@/components/base/ListBase'

export default {

  components:{
    //ListBase
  },
  
  data: ()=> ({
  }),
  computed:{
    ...mapGetters('employees',['getAllEmployees'])
  },


}
</script>

<style scoped>
a {
  margin:5px;
}
</style>