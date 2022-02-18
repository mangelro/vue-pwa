


module.exports = {
	
	publicPath: process.env.NODE_ENV === 'production'? '/vue' : '/',
	productionSourceMap:process.env.NODE_ENV === 'production',
	
	pwa:{
		themeColor: "#42b983",
		msTileColor: "#42b983",
		appleMobileWebAppCache: "yes",
		assetsVersion:'1.0',
		start_url: "./index.html",
		manifestOptions: {
			background_color: "#42b983"
		},

		//configure the workbox plugin
		//workboxPluginMode: "GenerateSW",

		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/src-sw.js',
			swDest: 'service-worker.js',
			/*
				Fichero de 'public/' excluidos del precached
			*/
			exclude: [
				/_redirects/,
				/web.config/,
				/robots.txt/,
			],
			maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
		},
	}
}