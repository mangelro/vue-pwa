<template>
  <div id="nav" class="menu top">
    <img src="/favicon.ico" class="circle small-margin" />

    <router-link to="/">
      <i>home</i>
      <div>Home</div>
    </router-link>

    <router-link to="/about">
      <i>insert_comment</i>
      <div>Acerca de</div>
    </router-link>

    <router-link :to="{name:'Registro'}">
      <i>people</i>
      <div>Firma</div>
    </router-link>
  </div>


  
</template>