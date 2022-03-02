/**
 * Rutas del módulo de registro de firmas y justificaciones
 */
export default {
	name: 'Registro',
	component: () => import(/* webpackChunkName: "FirmasLayout" */ '../layouts/FirmasLayout.vue'),
	children: [
		{
			name: 'Registro-Blank',
			path: '',
			component: () => import('../views/Blank.vue'),
		},
		{
			name: 'Firma',
			path: ':id(.{8}-.{4}-.{4}-.{4}-.{12})',
			component: () => import('../views/Firma.vue'),
			props: (router) => ({
				id: router.params.id,
			}),
		},
		{
			name: 'Justificacion',
			path: ':id(.{8}-.{4}-.{4}-.{4}-.{12})/justificacion',

			component: () => import('../views/Justificacion.vue'),
			props: (router) => ({
				id: router.params.id,
			}),
		},
		// {
		// 	path: '*',
		// 	redirect: { name: 'Registro-Blank' },
		// },
	],
}
