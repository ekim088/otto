// @flow
import Spy from './Spy';
import SpyOnModule from './SpyOnModule';

/**
 * Spies on all object properties.
 * @param {Object} obj The object containing the property to spy on.
 * @param {Array<Spy>} instantiatedSpyStore A store for instantiated spies.
 * @returns {Array<Spy>} The store of instantiated spies.
 */
function spyOnObject(
	obj: { ... },
	instantiatedSpyStore: Array<Spy>
): Array<Spy> {
	Object.keys(obj).forEach((prop: string) => {
		if (typeof obj[prop] !== 'object') {
			instantiatedSpyStore.push(new Spy(obj, prop));
		} else {
			spyOnObject(obj[prop], instantiatedSpyStore);
		}
	});

	return instantiatedSpyStore;
}

/**
 * Spies on the requested object property.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} [propName] The name of the property to spy on.
 */
export default function spyOn(obj: { ... }, propName?: string): SpyOnModule {
	const instantiatedSpies: Array<Spy> = [];

	if (typeof propName === 'string') {
		// spy on object property
		if (typeof obj[propName] === 'object') {
			spyOnObject(obj[propName], instantiatedSpies);
		} else {
			instantiatedSpies.push(new Spy(obj, propName));
		}
	} else {
		// spy on entire object if property name not provided
		spyOnObject(obj, instantiatedSpies);
	}

	return new SpyOnModule(obj, propName, instantiatedSpies);
}
