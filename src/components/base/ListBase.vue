<template>
    <div class="row no-wrap middle-align" v-for="item in items" :key="item.id">
      <div class="col min">
        <slot name="icon" :currentItem="item">
           <i class="light-green-text">check_circle</i>
        </slot>
      </div>
     
      <div class="col">
        <slot :currentItem="item">
          <!-- <div>{{item.title}}</div>
          <label v-if="item.subTitle">{{item.subTitle}}</label> -->
        </slot>
      </div>
    
      <div class="col min">
        <nav>
          <slot name="nav" :currentItem="item" :select="selectedItem"></slot>
        </nav>
      </div>
  </div>
</template>

<script>

export default {
	props:{
		items:{
			type:Array,
			required:true
		}
	},
  
	emits:['Selected'],

	methods:{
		selectedItem(id){
			this.$emit('Selected',id)
		}
	}

}
</script>