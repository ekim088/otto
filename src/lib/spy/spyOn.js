// @flow
import Spy from './Spy';

// record of spies created in most recent call of `spyOn`
const lastDeployedSpies: Array<Spy> = [];

/**
 * Spies on all object properties.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 */
function spyOnObject(obj: { ... }) {
	Object.keys(obj).forEach((prop: string) => {
		if (typeof obj[prop] !== 'object') {
			lastDeployedSpies.push(new Spy(obj, prop));
		} else {
			spyOnObject(obj[prop]);
		}
	});
}

/**
 * Spies on the requested object property.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 */
export default function spyOn(obj: { ... }, propName?: string): void {
	// reset last deployed spies array
	lastDeployedSpies.length = 0;

	if (typeof propName === 'string') {
		// spy on object property
		if (typeof obj[propName] === 'object') {
			spyOnObject(obj[propName]);
		} else {
			lastDeployedSpies.push(new Spy(obj, propName));
		}
	} else {
		// spy on entire object if property name not provided
		spyOnObject(obj);
	}
}
