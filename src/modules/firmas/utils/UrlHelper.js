/**
 * Determina si la dirección es absoluta
 * @param {string} url 
 * @returns true si es absoluta
 */

export const isAbsoluteUrl= (url) => url.startsWith('http')||url.startsWith('https')
