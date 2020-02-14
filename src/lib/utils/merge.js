// @flow
/**
 * Merges the contents of 2 objects into the first object. If the second
 * argument is a primitive type, it will overwrite the first argument.
 * @param {*} obj1 The base object.
 * @param {*} obj2 The object to merge into the first.
 * @returns {*} The merged object.
 */
export default function merge(obj1: any, obj2: any): any {
	let mergedObj = obj1;

	if (typeof obj2 === 'object') {
		if (typeof mergedObj !== 'object') {
			mergedObj = {};
		}

		Object.keys(obj2).forEach(key => {
			mergedObj[key] = merge(mergedObj[key], obj2[key]);
		});
	} else {
		mergedObj = obj2;
	}

	return mergedObj;
}
