// @flow
/**
 * Merges the contents of 2 objects into the first object. If the second
 * argument is a primitive type, it will overwrite the first argument.
 * @param {*} baseObj The base object.
 * @param {Array<*>} args Any number of additional objects to merge.
 * @returns {*} The merged object.
 */
export default function merge<T: mixed>(
	baseObj: any,
	...args: Array<T>
): $Shape<T> {
	let mergedObj = baseObj;

	args.forEach(objToMerge => {
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
