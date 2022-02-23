export const TYPES = Object.freeze({
	ERROR: 'error',
	WARNING: 'warning',
	DONE: 'done',
	INFO: 'info',
})

export const POSITIONS = Object.freeze({
	TOP: 'top',
	BOTTOM: 'bottom',
})

export const DEFAULT_OPTIONS ={
	position: POSITIONS.BOTTOM,
	type: TYPES.DONE,
	msToHide: 5000,
}