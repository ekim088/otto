// @flow
export default class Spy {
	// flow annotations
	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

	originalFunction: () => mixed;

	spiedFunctionContext: any;

	spiedFunctionName: string;

	/**
	 * Monitor and respond to function calls.
	 * @constructor
	 * @param {Object} context The context containing the spied function.
	 * @param {string} functionName The name of the function to spy on.
	 * @param {boolean} [callThrough] Whether the standard functionality of the
	 * 	spied function should be initiated when called.
	 */
	constructor(
		context: any,
		functionName: string,
		callThrough: boolean = false
	) {
		this.callThrough = callThrough;
		this.originalFunction = context[functionName];
		this.spiedFunctionContext = context;
		this.spiedFunctionName = functionName;

		// initiate spying
		this.decorateFunction();
	}

	decorateFunction() {
		this.spiedFunctionContext[this.spiedFunctionName] = (
			...args: Array<any>
		) => {
			console.log(`spied on ${this.spiedFunctionName}`);

			if (!this.callThrough) {
				return;
			}

			// call functions
			[this.before, this.originalFunction, this.after].forEach(fxn => {
				if (typeof fxn === 'function') {
					try {
						fxn.apply(this.spiedFunctionContext, args);
					} catch (error) {
						console.error(`an error occurred while spying: ${error.message}`);
					}
				}
			});
		};
	}

	reset() {
		this.spiedFunctionContext[this.spiedFunctionName] = this.originalFunction;
	}
}
