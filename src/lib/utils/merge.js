// @flow
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
		if (typeof objToMerge === 'object' && objToMerge !== null) {
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
			mergedObj = objToMerge;
		}
	});

	return mergedObj;
}
