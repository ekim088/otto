// @flow
export default class Spy {
	// flow annotations
	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

	originalFunction: ?() => mixed;

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
		): any => {
			let returnVal: any;

			console.log(`spied on ${this.spiedFunctionName}`);

			// call functions
			if (this.callThrough) {
				if (typeof this.before === 'function') {
					try {
						this.before.call(this.spiedFunctionContext);
					} catch (error) {
						console.error(
							`an error occurred while calling before: ${error.message}`
						);
					}
				}

				if (typeof this.originalFunction === 'function') {
					try {
						returnVal = this.originalFunction.apply(
							this.spiedFunctionContext,
							args
						);
					} catch (error) {
						console.error(
							`an error occurred while calling the spied function: ${error.message}`
						);
					}
				}

				if (typeof this.after === 'function') {
					try {
						this.after.call(this.spiedFunctionContext);
					} catch (error) {
						console.error(
							`an error occurred while calling after: ${error.message}`
						);
					}
				}
			}

			return returnVal;
		};
	}

	reset() {
		this.spiedFunctionContext[this.spiedFunctionName] = this.originalFunction;
	}
}
