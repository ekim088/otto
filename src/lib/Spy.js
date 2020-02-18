// @flow
import type { DecoratedFunction } from './utils/spyFunctionDecorator';
import spyFunctionDecorator from './utils/spyFunctionDecorator';

// Maintains a list of all instantiated spies.
const spyList = [];

export default class Spy {
	// flow annotations
	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

	fake: ?() => mixed;

	reset: () => void;

	/**
	 * Monitor and respond to function calls and property value updates.
	 * @constructor
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 */
	constructor(obj: any, propName: string) {
		if (!obj || !(propName in obj)) {
			throw new TypeError('must spy on defined object property');
		}

		// initiate spying
		this.callThrough = true;
		this.initiate(obj, propName);

		// add Spy to instantiated list
		spyList.push(this);
	}

	/**
	 * Initiates spying.
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 */
	initiate(obj: any, propName: string): void {
		// decorate property with function decorator
		if (typeof obj[propName] === 'function') {
			this.decorateFunction(obj, propName);
			// decorate property with getter/setter decorator
		} else {
			// ...
		}
	}

	/**
	 * Decorates a function to be spied upon.
	 * @param {Object} obj The object containing the function to spy on.
	 * @param {string} functionName The name of the function to spy on.
	 */
	decorateFunction(obj: any, functionName: string): void {
		const baseObject: any = obj;
		const originalFunction: () => mixed = obj[functionName];
		const decoratedFunction: DecoratedFunction = spyFunctionDecorator.call(
			this,
			obj,
			functionName
		);

		/**
		 * Spy on custom function props that exist on original function.
		 * Generate list of reserved props ie. props that have been applied
		 * by decorator to prevent overwrite of props required by spy.
		 */
		const reservedProps: Array<string> = Object.keys(decoratedFunction);

		/**
		 * Additional Spies deployed by this Spy to spy on custom methods
		 * attached to the original function being spied on.
		 */
		const additionalSpies: Array<Spy> = [];

		Object.keys(originalFunction)
			.filter((prop: string): boolean => reservedProps.indexOf(prop) === -1)
			.forEach((prop: string): void => {
				if (typeof originalFunction[prop] === 'function') {
					additionalSpies.push(new Spy(originalFunction, prop));
				}

				// point to original function prop on decorated function
				decoratedFunction[prop] = originalFunction[prop];
			});

		// initialize reset method for function spies
		this.reset = (): void => {
			additionalSpies.forEach((spy: Spy): void => spy.reset());
			baseObject[functionName] = originalFunction;
		};

		// replace original function with decorated function
		baseObject[functionName] = decoratedFunction;
	}

	// Resets all known instantiated spies.
	static resetAllSpies(): void {
		spyList.forEach((spy: Spy): void => spy.reset());
	}
}
