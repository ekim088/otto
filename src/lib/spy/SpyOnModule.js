// @flow
import logger from '../utils/logger';
import type Spy from './Spy';

export default class SpyOnModule {
	// flow annotations
	and: SpyOnModule;

	obj: { ... };

	propName: ?string;

	spies: Array<Spy>;

	/**
	 * Monitor and respond to function calls and property value updates.
	 * @constructor
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 * @param {Array<Spy>} spies The instantiated spies.
	 */
	constructor(obj: { ... }, propName: ?string, spies: Array<Spy> = []) {
		this.obj = obj;
		this.propName = propName;
		this.spies = spies;

		// apply self referential property for natural language chaining
		this.and = this;
	}

	/**
	 * Specifies a fake function to call when calling spied function.
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 */
	callFake(fakeFxn: (...args: Array<any>) => mixed): SpyOnModule {
		if (this.propName && typeof this.obj[this.propName] === 'function') {
			this.spies.forEach(spy => {
				const spyToUpdate = spy;
				spyToUpdate.fake = fakeFxn;
			});
		} else {
			logger.warn('callFake can only be called on function spies.');
		}

		return this;
	}
}
