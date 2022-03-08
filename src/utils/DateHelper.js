const ML_PER_DAY = 8_640_0000

/**
 *  Retorna el número de días entre dos fechas (inclusive)
 * 	Si fin es posterior a ini retorna los dias en negativo

 * @param {Date} ini Fecha de inicio del periodo
 * @param {Date} fin Fecha de fin del peridodo
 * @returns {Number} Número de días enteros entre las fechas (inclusive). Si fin es mayor que date1 retorna los dias en negativo
 */

export const DaysBetweenDates = (ini,fin) => {

	const date1=new Date(ini.getFullYear(),ini.getMonth(),ini.getDate())
	const date2=new Date(fin.getFullYear(),fin.getMonth(),fin.getDate())
	const diff = date2 - date1 //diferencia en ml
	const days = diff / ML_PER_DAY
	return (Math.ceil(Math.abs(days)) + 1) * (diff<0?-1:1)
}

/**
 * Devuele la fecha y hora actual en UTC
 * @returns
 */
export const nowUTC = () => {
	const now = new Date()

	//console.log(now.getTimezoneOffset())

	const c = [
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
		now.getUTCHours(),
		now.getUTCMinutes(),
		now.getUTCSeconds(),
	]
	//const c= [now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()]

	//console.log(new Date(...c).toISOString())

	return new Date(Date.UTC(...c))
}
