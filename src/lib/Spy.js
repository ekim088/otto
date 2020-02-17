// @flow
import clone from './utils/clone';
import logger from './utils/logger';

type CallEntry = {
	args: Array<Array<any>>,
	return: any
};

type DecoratedFunction = {
	(): mixed,
	calls: Array<CallEntry>
};

// Maintains a list of all instantiated spies.
const spyList = [];

export default class Spy {
	// flow annotations
	addSpy: Spy => number;

	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

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
		const originalVal = context[propKey];
		const propContext = context;
		this.reset = () => {
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
		const that = this;
		const functionContext: any = context;
		const originalFunction: () => mixed = context[functionName];
		const decoratedFunction: DecoratedFunction = function decoratedFunction(
			...args: Array<any>
		): mixed {
			// generate initial call object for logging
			const call: CallEntry = {
				args: clone(Array.from(args)),
				return: undefined
			};
			let returnVal: mixed;

			logger.info(`spied on ${functionName}`);

			// call functions
			if (that.callThrough) {
				if (typeof that.before === 'function') {
					try {
						that.before.apply(functionContext);
					} catch (error) {
						logger.error(
							`an error occurred while calling before: ${error.message}`
						);
					}
				}

				try {
					returnVal = originalFunction.apply(functionContext, args);
					call.return = clone(returnVal);
				} catch (error) {
					logger.error(
						`an error occurred while calling the spied function: ${error.message}`
					);
					call.return = `Error: ${error.message}`;
				}

				if (typeof that.after === 'function') {
					try {
						that.after.apply(functionContext);
					} catch (error) {
						logger.error(
							`an error occurred while calling after: ${error.message}`
						);
					}
				}
			}

			// add spied function call to call log
			decoratedFunction.calls.push(call);
			return returnVal;
		};

		// spy on custom function props that exist on original function
		Object.keys(originalFunction).forEach((prop: string): void => {
			if (typeof originalFunction[prop] === 'function') {
				this.addSpy(new Spy(originalFunction, prop));
			}

			// point to original function prop on decorated function
			decoratedFunction[prop] = originalFunction[prop];
		});

		// apply additional tracking props onto decorated function
		decoratedFunction.calls = [];

		// replace original function with decorated function
		functionContext[functionName] = decoratedFunction;
	}

	// Resets all known instantiated spies.
	static resetAllSpies(): void {
		spyList.forEach((spy: Spy): void => spy.reset());
	}
}
