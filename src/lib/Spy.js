// @flow
export default class Spy {
	// flow annotations
	callThrough: boolean;

	originalFunction: Function;

	spiedFunctionContext: Object;

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
		context: Object,
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
		this.spiedFunctionContext[this.spiedFunctionName] = (...args) => {
			console.log(`spied on ${this.spiedFunctionName}`);

			if (this.callThrough) {
				// before
				// ...

				// call original function
				console.log(`calling original ${this.spiedFunctionName}`);
				this.originalFunction.apply(this.spiedFunctionContext, args);

				// after
				// ...
			}
		};
	}

	reset() {
		this.spiedFunctionContext[this.spiedFunctionName] = this.originalFunction;
	}
}
