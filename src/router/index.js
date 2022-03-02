/**
 * 
 * 
 * 
 */
import { createRouter, createWebHistory } from 'vue-router'

import registro from '../modules/firmas/router'
import empleados from '../modules/empleados/router'
import {getUserFromStorage} from '@/services/userStorageHelper'
//import auth from '../modules/auth/services/auth.service'

const routes = [
	{
		path: '/',
		name: 'Home',
		meta:{authorization:'?'},
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/about',
		name: 'About',
		meta:{authorization:'?'},
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
		props: (router) => ({
			returnUrl: decodeURIComponent(router.query.r),
		}),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
	},
	{
		path: '/registro',
		meta:{authorization:'*'},
		...registro,
	},
	{
		path: '/empleados',
		meta:{authorization:'empleados'},
		...empleados,

	},

	// {
	// 	path:'/users/:id(.{8}-.{4}-.{4}-.{4}-.{12})?',
	// 	name:'Usuarios',
	// 	meta:{authorization:'*'},
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
	// 	props: (router) => ({
	// 		id: router.params.id,
	// 	}),
	// },
	{
		path: '/:pathMatch(.*)*',
		component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

/**
 * 	authorization de las rutas
 * 	
 *  			'?' 	- No necesita estar autenticado. No posee roles
 * 				'*'		- Necesita estar autenticado pero no necesita un rol en particular
 * 	'admin,editor'..	- Necesita estar autenticado y un rol concreto
 * 
 */

router.beforeEach( async to => {

	const userAuthenticated= getUserFromStorage() //Usuario en almacenamiento local
	
	const userRoles=userAuthenticated?.roles??'?' //Si no existe el usuario el rol es ?

	const urlAutorizacion=to.meta.authorization||'?' //roles autorizados en la url

	//console.log('authorization',userRoles,urlAutorizacion)

	if (urlAutorizacion!=='?' && to.name !== 'Login'){
		if (!canAccess(userRoles,urlAutorizacion)) {  //❗️ Avoid an infinite redirect
			return {name:'Login', query:{r:encodeURIComponent(to.fullPath)}}
		}
	}
})

/**
 *  Determina si el usuario posee los roles necesarios para
 * 	acceder a la url
 */
const canAccess = (userAuthentication,urlAuthentication)=>{

	const userRoles= userAuthentication.split(',') //roles del usuario
	const urlRoles = urlAuthentication.split(',') //roles requeridos
	
	

	if (urlRoles.includes('*') && !userRoles.includes('?'))
		return true

	
	
	const notFound= userRoles.every(userRol  => {
		console.log(userRol)	
		
		if (urlRoles.includes(userRol))
			return false

		return true
	})

	return !notFound



}

export default router
