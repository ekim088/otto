// @flow
export default class Spy {
	// flow annotations
	addSpy: Spy => number;

	after: ?() => mixed;

	before: ?() => mixed;

	calls: Array<{
		arguments: Array<any>,
		return: mixed
	}>;

	callThrough: boolean;

	reset: () => void;

	/**
	 * Monitor and respond to function calls.
	 * @constructor
	 * @param {Object} context The context containing the spied function.
	 * @param {string} propKey The name of the property to spy on
	 */
	constructor(context: any, propKey: string) {
		this.calls = [];
		this.callThrough = true;

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
	}

	/**
	 * Decorates a function to be spied upon.
	 * @param {Object} context The context of the function to spy on.
	 * @param {string} functionName The name of the function to spy on.
	 */
	decorateFunction(context: any, functionName: string): void {
		const functionContext: any = context;
		const originalFunction: () => mixed = context[functionName];
		const decoratedFunction: () => mixed = (...args: Array<any>): mixed => {
			let returnVal: mixed;

			console.log(`spied on ${functionName}`);

			// call functions
			if (this.callThrough) {
				if (typeof this.before === 'function') {
					try {
						this.before.apply(functionContext);
					} catch (error) {
						console.error(
							`an error occurred while calling before: ${error.message}`
						);
					}
				}

				try {
					returnVal = originalFunction.apply(functionContext, args);

					// add spied function call to call log
					this.calls.push({
						arguments: Array.from(args),
						return: returnVal
					});
				} catch (error) {
					console.error(
						`an error occurred while calling the spied function: ${error.message}`
					);
				}

				if (typeof this.after === 'function') {
					try {
						this.after.apply(functionContext);
					} catch (error) {
						console.error(
							`an error occurred while calling after: ${error.message}`
						);
					}
				}
			}

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

		// replace original function with decorated function
		functionContext[functionName] = decoratedFunction;
	}
}
