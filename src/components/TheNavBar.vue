<template>
  <div id="nav" class="menu top">
    <img src="/favicon.ico" class="circle small-margin" />

    <router-link to="/">
      <i>home</i>
      <div>Home</div>
    </router-link>

      <router-link :to="{name:'About'}">
      <i>insert_comment</i>
      <div>Acerca de</div>
    </router-link>

    <router-link :to="{name:'Empleados'}">
      <i>access_time</i>
      <div>Registro</div>
    </router-link>
    
    <router-link :to="{name:'Usuarios'}">
      <i>people</i>
      <div>Usuarios</div>
    </router-link>
  </div>


  
</template>