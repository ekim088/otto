/* eslint-disable no-new */
// @flow
import Spy from './Spy';

/**
 * Spies on the requested object property.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 */
export default function spyOn(obj: { ... }, propName: string): void {
	new Spy(obj, propName);
}
