<template>
  <div id="nav" class="menu top">
    <img src="favicon.ico" class="circle small-margin" />

    <router-link :to="{name:'Home'}"  custom v-slot="{href,navigate,isActive}" >
      <a :href="href" @click="navigate" :class="{active:isActive}">
      <i>home</i>
      <div>Home</div>
      </a>
    </router-link>

    <router-link :to="{name:'Empleados'}" custom v-slot="{href,navigate,isActive}" >
      <a :href="href" @click="navigate" :class="{active:isActive}">
          <i>access_time</i>
          <div>Registro</div>
      </a>
    </router-link>

    <router-link :to="{name:'Usuarios'}" custom v-slot="{href,navigate,isActive}" >
      <a :href="href" @click="navigate" :class="{active:isActive}">
        <i>people</i>
        <div>Usuarios</div>
      </a>
    </router-link>


    <router-link :to="{name:'About'}"  custom v-slot="{href,navigate,isActive}" >
      <a :href="href" @click="navigate" :class="{active:isActive}">
        <i>insert_comment</i>
        <div>Acerca de</div>
      </a>
    </router-link>


  </div>
</template>

