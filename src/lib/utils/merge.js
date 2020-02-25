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
export default function merge<T: mixed>(
	target: any,
	...sources: Array<T>
): $Shape<T> {
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
