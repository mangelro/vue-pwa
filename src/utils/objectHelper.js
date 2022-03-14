/**
 *
 *
 *
 */

/**
 * Clona un objeto de manera profunda
 * @param {Object} target
 * @returns
 */
export const cloneObj = target => JSON.parse(JSON.stringify(target))

/**
 * Comparación profunda de las propiedades de dos objetos
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns
 */
export const compareObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)
