// @flow

/**
 * Performs a deep copy of the original input.
 * @param {*} orig The original input.
 * @returns {*} A clone of the original input.
 */
export function clone<T>(orig: T): T {
	let cloned = orig;

	if (Array.isArray(orig)) {
		cloned = orig.map(el => clone(el));
	} else if (typeof orig === 'object' && orig !== null) {
		cloned = merge({}, orig);
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

	sources.forEach(objToMerge => {
		if (
			typeof objToMerge === 'object' &&
			objToMerge !== null &&
			!Array.isArray(objToMerge)
		) {
			if (typeof mergedObj !== 'object') {
				mergedObj = {};
			}

			Object.keys(objToMerge).forEach((key: string): void => {
				((mergedObj: any): { ... })[key] = merge(
					((mergedObj: any): { ... })[key],
					objToMerge[key]
				);
			});
		} else {
			mergedObj = Array.isArray(objToMerge) ? clone(objToMerge) : objToMerge;
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
 * @param {*} origin An object that acts as the starting point for
	navigation.
 * @param {string} path The path to the nested object property not including
 	the originating object.
 */
export function traverse(origin: { ... }, path: string): mixed {
	const pathComponents: Array<string> =
		typeof path === 'string' ? path.split('.') : [];
	let val: mixed = origin;

	while (val && pathComponents.length > 0) {
		val = ((val: any): { ... })[pathComponents.shift()];
	}

	return val;
}
