// @flow
/**
 * Merges the contents of 2 objects into the first object. If the second
 * argument is a primitive type, it will overwrite the first argument.
 * @param {*} baseObj The base object.
 * @param {Array<*>} args Any number of additional objects to merge.
 * @returns {*} The merged object.
 */
export default function merge(baseObj: {}, ...args: Array<mixed>): any {
	let mergedObj: any = baseObj;

	args.forEach((objToMerge: mixed): void => {
		if (typeof objToMerge === 'object' && objToMerge !== null) {
			if (typeof mergedObj !== 'object') {
				mergedObj = {};
			}

			Object.keys(objToMerge).forEach((key: string): void => {
				mergedObj[key] = merge(mergedObj[key], objToMerge[key]);
			});
		} else {
			mergedObj = objToMerge;
		}
	});

	return mergedObj;
}
