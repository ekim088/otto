// @flow
/**
 * Mirrors properties of objects onto the target object.
 * @param {*} target The target object.
 * @param {Array<*>} sources Any number of additional objects to merge.
 * @returns {*} The mirrored object.
 */
export default function mirrorProperties<T: { [prop: string]: mixed }>(
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
