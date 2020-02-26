// @flow

/**
 * Creates a deep copy clone of the source object.
 * @param {*} source The source to clone.
 * @returns {*} A clone of the source object.
 */
export function clone<T>(source: T): T {
	let cloned = source;

	if (Array.isArray(source)) {
		cloned = source.map(el => clone(el));
	} else if (typeof source === 'object' && source !== null) {
		cloned = merge({}, source);
	}

	return cloned;
}

/**
 * Merges the contents of objects into the target object. Merging a primitive
 * type or function into the target will overwrite the target argument.
 * @param {*} target The target object.
 * @param {Array<*>} sources Any number of additional objects to merge.
 * @returns {*} The merged object.
 */
export function merge<T: mixed>(target: any, ...sources: Array<T>): $Shape<T> {
	let mergedObj = target;

	sources.forEach(source => {
		if (
			typeof source === 'object' &&
			source !== null &&
			!Array.isArray(source)
		) {
			if (typeof mergedObj !== 'object') {
				mergedObj = {};
			}

			Object.keys(source).forEach((key: string): void => {
				((mergedObj: any): { ... })[key] = merge(
					((mergedObj: any): { ... })[key],
					source[key]
				);
			});
		} else {
			mergedObj = clone(source);
		}
	});

	return mergedObj;
}

/**
 * Mirrors properties of objects onto the target object.
 * @param {*} target The target object.
 * @param {Array<*>} sources Any number of additional objects to merge.
 * @returns {*} The mirrored object.
 */
export function mirrorProperties<T: { [prop: string]: mixed }>(
	target: T,
	...sources: Array<T>
): $Shape<T> {
	const targetObj = target;

	sources.forEach(sourceObj => {
		Object.keys(sourceObj).forEach((prop: string) => {
			targetObj[prop] = sourceObj[prop];
		});
	});

	return targetObj;
}

/**
 * Safely navigates to a nested object property.
 * @param {*} source An object that acts as the starting point for
	navigation.
 * @param {string} path The path to the nested object property not including
 	the originating object.
 */
export function traverse(source: { ... }, path: string): mixed {
	const pathComponents: Array<string> =
		typeof path === 'string' ? path.split('.') : [];
	let val: mixed = source;

	while (val && pathComponents.length > 0) {
		val = ((val: any): { ... })[pathComponents.shift()];
	}

	return val;
}
