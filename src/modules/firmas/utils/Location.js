/**
 * Retorna la posición actual
 * @param {Object} options
 * 	{
 * 		enableHighAccuracy: Boolean
 * 		timeout: Number
 * 		maximumAge: Number
 * 	}
 *
 *
 * @returns
 */

const defaultOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
}

export const getCurrentPosition = (options) => {

	const newOptions = {
		...defaultOptions,
		...options,
	}

	
	return new Promise((resolve, reject) => {

		const supported = typeof window !== 'undefined' && navigator && 'geolocation' in navigator

		if (!supported) reject('geolocation not supported')

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const { latitude, longitude, accuracy } = coords
				resolve(Object.freeze({ latitude, longitude, accuracy }))
			},
			reject,
			newOptions
		)
	})
}