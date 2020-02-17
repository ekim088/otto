// @flow
import type { DecoratedFunction } from './utils/spyFunctionDecorator';
import spyFunctionDecorator from './utils/spyFunctionDecorator';

// Maintains a list of all instantiated spies.
const spyList = [];

export default class Spy {
	// flow annotations
	addSpy: Spy => number;

	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

	fake: ?() => mixed;

	reset: () => void;

	/**
	 * Monitor and respond to function calls.
	 * @constructor
	 * @param {Object} context The context containing the spied function.
	 * @param {string} propKey The name of the property to spy on
	 */
	constructor(context: any, propKey: string) {
		if (!context || typeof context[propKey] === 'undefined') {
			throw new TypeError('must spy on defined object property');
		}

		/**
		 * Additional Spies deployed by this Spy to spy on custom methods
		 * attached to the original function being spied on.
		 */
		const additionalSpies: Array<Spy> = [];
		this.addSpy = spy => additionalSpies.push(spy);

		// initialize reset method
		const originalVal: mixed = context[propKey];
		const propContext: any = context;
		this.reset = (): void => {
			additionalSpies.forEach((spy: Spy): void => spy.reset());
			propContext[propKey] = originalVal;
		};

		// initiate spying
		this.decorateFunction(context, propKey);
		this.callThrough = true;

		// add Spy to instantiated list
		spyList.push(this);
	}

	/**
	 * Decorates a function to be spied upon.
	 * @param {Object} context The context of the function to spy on.
	 * @param {string} functionName The name of the function to spy on.
	 */
	decorateFunction(context: any, functionName: string): void {
		const functionContext: any = context;
		const originalFunction: () => mixed = context[functionName];
		const decoratedFunction: DecoratedFunction = spyFunctionDecorator.call(
			this,
			context,
			functionName
		);

		/**
		 * Spy on custom function props that exist on original function.
		 * Generate list of reserved props ie. props that have been applied
		 * by decorator to prevent overwrite of props required by spy.
		 */
		const reservedProps: Array<string> = Object.keys(decoratedFunction);
		Object.keys(originalFunction)
			.filter((prop: string): boolean => reservedProps.indexOf(prop) === -1)
			.forEach((prop: string): void => {
				if (typeof originalFunction[prop] === 'function') {
					this.addSpy(new Spy(originalFunction, prop));
				}

				// point to original function prop on decorated function
				decoratedFunction[prop] = originalFunction[prop];
			});

		// replace original function with decorated function
		functionContext[functionName] = decoratedFunction;
	}

	// Resets all known instantiated spies.
	static resetAllSpies(): void {
		spyList.forEach((spy: Spy): void => spy.reset());
	}
}
