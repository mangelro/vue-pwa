/**
 * Rutas hijas del modulo
 */

export default {
	name: 'Empleados',
	component: () => import(/* webpackChunName:"EmpleadosLayout"*/ '../layouts/EmpleadosLayout.vue'),
	children: [
		{
			name:'Empleados-Blank',
			path:'',
			component: () => import('../views/Blank.vue'),
		},
		{
			name:'Empleados-Vacaciones',
			path:'vacaciones',
			component: () => import('../views/Vacaciones.vue'),
		},
		// {
		// 	path: '*',
		// 	redirect: { name: 'Empleados-Blank' },
		// },
	],
}
