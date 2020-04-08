// @flow
/**
 * A module of JS object utility functions. Namespaced at `otto.object`.
 *
 * @module otto/object
 */

/**
 * Creates a deep copy clone of the source object.
 *
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
 * Iterates over source object and calls sets value of property to result of
 * calling a handler function on each property value. The handler function will
 * be called with the value of the current property. An optional condition
 * function can be passed to test the property value against to determine
 * whether to call the handler function on that property.
 *
 * @param {object} source The object to iterate over.
 * @param {Function} handler The function to call on each property value. The
 * 	value of the property will be updated if the handler function returns a
 * 	result.
 * @param {Function} [condition] An optional function to call before calling
 * 	the handler function, where truthy results will initiate a call to the
 * 	handler.
 * @returns {object} The updated source object.
 */
export function iterateAndCall(
	source: { ... },
	handler: (...args: Array<any>) => ?mixed,
	condition?: (...args: Array<any>) => boolean | mixed
) {
	const src = source;

	Object.keys(src).forEach(key => {
		if (typeof condition !== 'function' || condition(src, key)) {
			const returnVal = handler(src, key);

			if (typeof returnVal !== 'undefined') {
				src[key] = returnVal;
			}
		}
	});

	return src;
}

/**
 * Merges the contents of objects into the target object. Merging a primitive
 * type or function into the target will overwrite the target argument.
 *
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
 *
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
 *
 * @param {*} source An object that acts as the starting point for
	navigation.
 * @param {string} path The path to the nested object property not including
 	the originating object.
 * @returns {*} The value at the specified path, or `undefined` if path cannot
 * 	be reached.
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

export default { clone, iterateAndCall, merge, mirrorProperties, traverse };
