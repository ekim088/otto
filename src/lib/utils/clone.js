// @flow
import merge from './merge';

/**
 * Performs a deep copy of the original input.
 * @param {*} orig The original input.
 * @returns {*} A clone of the original input.
 */
export default function clone<T>(orig: T): T {
	let cloned = orig;

	if (Array.isArray(orig)) {
		cloned = orig.map(el => clone(el));
	} else if (typeof orig === 'object' && orig !== null) {
		cloned = merge({}, orig);
	}

	return cloned;
}
