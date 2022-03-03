<template>
	<h3>home</h3>
	<beer-loader></beer-loader>
	<button @click="$eventBus.$emit('logout')" >salir</button>
</template>
