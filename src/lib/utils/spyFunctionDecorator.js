// @flow
import clone from './clone';
import logger from './logger';
import type Spy from '../Spy';

type CallEntry = {
	args: Array<Array<any>>,
	return: any
};

export type DecoratedFunction = {
	(): mixed,
	calls: Array<CallEntry>
};

/**
 * Decorates a function to be spied upon.
 * @param {Object} context The context of the function to spy on.
 * @param {string} functionName The name of the function to spy on.
 */
export default function spyFunctionDecorator(
	context: any,
	functionName: string
) {
	const that: Spy = this;
	const calls: Array<CallEntry> = [];
	const originalFunction: () => mixed = context[functionName];
	const decoratedFunction: DecoratedFunction = function decoratedFunction(
		...args: Array<any>
	): mixed {
		// call `fake` function instead of original if defined
		const baseFunction =
			typeof that.fake === 'function' ? that.fake : originalFunction;

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
					that.before.apply(context);
				} catch (error) {
					logger.error(
						`an error occurred while calling before: ${error.message}`
					);
				}
			}

			try {
				returnVal = baseFunction.apply(context, args);
				call.return = clone(returnVal);
			} catch (error) {
				logger.error(
					`an error occurred while calling the spied function: ${error.message}`
				);
				call.return = `Error: ${error.message}`;
			}

			if (typeof that.after === 'function') {
				try {
					that.after.apply(context);
				} catch (error) {
					logger.error(
						`an error occurred while calling after: ${error.message}`
					);
				}
			}
		}

		/**
		 * Add spied function call to call log and reapply call prop to prevent
		 * overwriting.
		 */
		calls.push(call);
		decoratedFunction.calls = calls;
		return returnVal;
	};

	// initialize additional tracking props onto decorated function
	decoratedFunction.calls = calls;

	return decoratedFunction;
}
