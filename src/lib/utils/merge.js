// @flow
/**
 * Merges the contents of 2 objects into the first object. If the second
 * argument is a primitive type, it will overwrite the first argument.
 * @param {*} obj1 The base object.
 * @param {Array<*>} args Any number of additional objects to merge.
 * @returns {*} The merged object.
 */
export default function merge(obj1: any, ...args: Array<any>): any {
	let mergedObj = obj1;

	args.forEach(objToMerge => {
		if (
			(typeof objToMerge === 'object' && objToMerge !== null) ||
			typeof objToMerge === 'function'
		) {
			if (typeof mergedObj !== 'object' && typeof objToMerge !== 'function') {
				mergedObj = {};
			}

			Object.keys(objToMerge).forEach(key => {
				mergedObj[key] = merge(mergedObj[key], objToMerge[key]);
			});
		} else {
			mergedObj = objToMerge;
		}
	});

	return mergedObj;
}
