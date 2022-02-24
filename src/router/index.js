import { createRouter, createWebHistory } from 'vue-router'

import registro from '../modules/firmas/router'
import auth from '../api/authApi'

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
		path: '/registro',
		...registro,
	},
	{
		path:'/users/:id(.{8}-.{4}-.{4}-.{4}-.{12})?',
		name:'Usuarios',
		meta:{authorization:'*'},
		component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue'),
		props: (router) => ({
			id: router.params.id,
		}),
	},
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

	const userAuthentication= await auth().userRoles() //Servicio de roles externo

	const urlAutorizacion=to.meta.authorization||'?' //roles autorizados en la url

	console.log('authorization',userAuthentication,urlAutorizacion)

	if (urlAutorizacion!=='?' && to.name !== 'Login'){
		if (!canAccess(userAuthentication,urlAutorizacion)) {  //❗️ Avoid an infinite redirect
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
	
	return userRoles.every(userRol  => {
		const index=urlRoles.findIndex(urlRol => urlRol===userRol)
		if (index > -1){
			return true
		}
	})
}

export default router
