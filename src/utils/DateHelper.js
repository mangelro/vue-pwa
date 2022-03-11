/**
 * https://devhints.io/wip/intl-datetime
 * 
 * 
 */
const ML_PER_DAY = 8_640_0000
/**
 *  Retorna el número de días entre dos fechas (inclusive)
 * 	Si fin es posterior a ini retorna los dias en negativo
 *  
 * @param {Date} ini Fecha de inicio del periodo
 * @param {Date} fin Fecha de fin del peridodo
 * @returns {Number} Número de días enteros entre las fechas (inclusive). Si fin es mayor que date1 retorna los dias en negativo
 */
export const daysBetweenDates = (ini,fin) => {

	const date1=new Date(ini.getFullYear(),ini.getMonth(),ini.getDate())
	const date2=new Date(fin.getFullYear(),fin.getMonth(),fin.getDate())
	const diff = date2 - date1 //diferencia en ml
	const days = diff / ML_PER_DAY

	return (Math.ceil(Math.abs(days)) + 1) * Math.sign(diff)
}

/**
 * Devuele la fecha y hora actual en UTC
 * @returns
 */
export const nowUTC = () => {
	const now = new Date()

	const c = [
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate(),
		now.getUTCHours(),
		now.getUTCMinutes(),
		now.getUTCSeconds(),
	]

	return new Date(Date.UTC(...c))
}

/**
 * Formato de presentacion de la fecha/hora
 */
const defaultOptions = Object.freeze({
	weekday: 'long', 
	year: 'numeric', 
	month: 'long', 
	day: 'numeric', 
	hour:'2-digit',
	minute:'2-digit',
})

/**
 * Normaliza las opciones de usuario, eliminando o actualizando las opciones
 * @param {Options} def  Opciones por defecto
 * @param {Options} opt  Opciones particulares del usuario. null para eliminar la opción por defecto
 * @returns {Options}
 */
const normalizeOptions = (def,opt) =>
{
	const newDef={...def}

	for (let [key, value] of Object.entries(opt)) {
		if (value===null){
			delete newDef[key]
		}
		else{
			newDef[key]=value
		}
			
	}
	
	return newDef
}

/**
 * Retorna una cadena con la representación de la fecha y la hora
 * @param {Date,String} date Fecha a mostrar
 * @param {Options} options Opciones de respresentación de la feria
 * @param {String} lang Idioma en el que mostar la fecha
 * @returns {String} Representación de la fecha/hora
 */
export const toDateTimeString = (date,options={},lang='es-ES') =>
{
	if (!date) {
		return ''
	}
		
	const newOption=normalizeOptions(defaultOptions,options)

	const currentDate= Date.parse(date)
	
	return new Intl.DateTimeFormat(lang,newOption).format(currentDate)
	
	
}