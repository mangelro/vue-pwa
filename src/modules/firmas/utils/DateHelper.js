
const ML_PER_DAY=8_640_0000

/**
 * Retorna el número de días entre dos fechas
 * Si date2 es mayor que date1 retorna los dias en negativo
 */

export const DaysBetweenDates= (date1,date2)=>{
	const diff=date1-date2
	return diff/ML_PER_DAY
}

/**
 * 
 * @returns 
 */
export const nowUTC = ()=>{

	const now =new Date()
	
	//console.log(now.getTimezoneOffset())

	const c= [now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds()]
	//const c= [now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()]

	//console.log(c)

	return new Date(...c)
}

