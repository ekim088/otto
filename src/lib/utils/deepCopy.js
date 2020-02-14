// @flow
import merge from './merge';

/**
 * Performs a deep copy of an object.
 * @param {*} obj The original object.
 * @returns {*} A clone of the original object.
 */
export default function deepCopy(obj: any): any {
	return typeof obj === 'object' ? merge({}, obj) : obj;
}
