/* eslint-disable no-undef */


workbox.setConfig({ debug: true });

// define a prefix for your cache names. It is recommended to use your project name
workbox.core.setCacheNameDetails({prefix:  "vue-pwa"})

// These lines are responsible for precaching static resources. Using 'generateSW'(zero config), these lines would be added automatically to the serviceworker. 
// __precacheManifest is the list of resources you want to precache. It will be generated and imported automatically by workbox during build time 
self.__precacheManifest = [].concat(self.__precacheManifest || [])

workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
	/^.*\.(jpg|JPG|gif|GIF|png|PNG|eot|woff(2)?|ttf|svg)$/, 
	new workbox.strategies.CacheFirst({ 
		cacheName: 'image-cache', 
		plugins: [
			new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }), 
			new workbox.expiration.Plugin({
				maxAgeSeconds: 10 * 60 // 10 minutes
			})
		] }), 'GET');


// workbox.routing.registerRoute(
// 	/.*\.js$/, 
// 	new workbox.strategies.NetworkFirst({ 
// 		cacheName: 'js-cache', 
// 		plugins: [
// 			new workbox.cacheableResponse.Plugin({ statuses: [0, 200] }), 
// 			new workbox.expiration.Plugin({
// 				maxAgeSeconds: 10 * 60 // 10 minutes
// 			})
// 		] }), 'GET');