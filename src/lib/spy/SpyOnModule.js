// @flow
import logger from '../utils/logger';
import type Spy from './Spy';

/**
 * Chainable module that allows for configuration of a Spy after it has been
 * initially deployed. The self-referential property `and` can be used for
 * natural language chaining.
 * @see {@link Spy}
 */
export default class SpyOnModule {
	// flow annotations
	and: SpyOnModule;

	obj: { ... };

	propName: ?string;

	spies: Array<Spy>;

	/**
	 * @constructor
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 * @param {Array<Spy>} spies The instantiated spies.
	 */
	constructor(obj: { ... }, propName: ?string, spies: Array<Spy> = []) {
		/**
		 * The object being spied.
		 * @type {Object}
		 */
		this.obj = obj;

		/**
		 * The name of the object property being spied.
		 * @type {string|undefined}
		 */
		this.propName = propName;

		/**
		 * A list of spies deployed to the specified object location.
		 * @type {Array<Spy>}
		 */
		this.spies = spies;

		// apply self referential property for natural language chaining
		this.and = this;
	}

	/**
	 * Specifies a function to call after calling the spied function. The after
	 * function will be called with the return result of the spied function.
	 * @param {Function} afterFxn A function to call after the spied function.
	 * @returns {SpyOnModule} The current module instance.
	 */
	callAfter(afterFxn: (?mixed) => void): SpyOnModule {
		if (isMethod(this.obj, this.propName)) {
			this.spies.forEach((spy: Spy): void => {
				const spyToUpdate = spy;
				spyToUpdate.after = afterFxn;
			});
		} else {
			logger.warn('callAfter can only be called on function spies.');
		}

		return this;
	}

	/**
	 * Specifies a function to call before calling the spied function. The
	 * before function will be called with the same arguments passed to the
	 * spied function.
	 * @param {Function} beforeFxn A function to call before the spied function.
	 * @returns {SpyOnModule} The current module instance.
	 */
	callBefore(beforeFxn: ?(...args: Array<any>) => void): SpyOnModule {
		if (isMethod(this.obj, this.propName)) {
			this.spies.forEach((spy: Spy): void => {
				const spyToUpdate = spy;
				spyToUpdate.before = beforeFxn;
			});
		} else {
			logger.warn('callBefore can only be called on function spies.');
		}

		return this;
	}

	/**
	 * Specifies a fake function to call when calling spied function.
	 * @param {Function} fakeFxn A fake function to call in place of the
	 * 	original function.
	 * @returns {SpyOnModule} The current module instance.
	 */
	callFake(fakeFxn: (...args: Array<any>) => mixed): SpyOnModule {
		if (isMethod(this.obj, this.propName)) {
			this.spies.forEach((spy: Spy): void => {
				const spyToUpdate = spy;
				spyToUpdate.fake = fakeFxn;
			});
		} else {
			logger.warn('callFake can only be called on function spies.');
		}

		return this;
	}
}

/**
 * Checks whether the object property is a function.
 * @param {Object} obj The object containing the property to test.
 * @param {string} propName The name of the property to test.
 * @returns {boolean} Returns `true` if the object property is a function.
 * @ignore
 */
function isMethod(obj: { ... }, propName: ?string): boolean {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		typeof propName === 'string' &&
		typeof obj[propName] === 'function'
	);
}
