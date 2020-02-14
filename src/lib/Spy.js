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

			// before
			if (typeof this.before === 'function') {
				try {
					this.before.call(this.spiedFunctionContext);
				} catch (error) {
					console.log(
						`an error occurred while calling a function before ${this.spiedFunctionName}`
					);
					throw error;
				}
			}

			// call original function
			try {
				console.log(`calling original ${this.spiedFunctionName}`);
				this.originalFunction.apply(this.spiedFunctionContext, args);
			} catch (error) {
				console.log(
					`an error occurred while calling ${this.spiedFunctionName}`
				);
				throw error;
			}

			// after
			if (typeof this.after === 'function') {
				try {
					this.after.call(this.spiedFunctionContext);
				} catch (error) {
					console.log(
						`an error occurred while calling a function after ${this.spiedFunctionName}`
					);
					throw error;
				}
			}
		};
	}

	reset() {
		this.spiedFunctionContext[this.spiedFunctionName] = this.originalFunction;
	}
}
