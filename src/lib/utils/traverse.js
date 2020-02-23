// @flow
/**
 * Safely navigates to a nested object property.
 * @param {*} origin An object that acts as the starting point for
	navigation.
 * @param {string} path The path to the nested object property not including
 	the originating object.
 */
export default function traverse(origin: { ... }, path: string): mixed {
	const pathComponents: Array<string> =
		typeof path === 'string' ? path.split('.') : [];
	let val: mixed = origin;

	while (val && pathComponents.length > 0) {
		val = ((val: any): { ... })[pathComponents.shift()];
	}

	return val;
}
