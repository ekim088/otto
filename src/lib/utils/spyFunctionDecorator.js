// @flow
import clone from './clone';
import logger from './logger';
import spyDecoratorLogger from './spyDecoratorLogger';
import type Spy from '../Spy';
import type { CallEntry, FunctionLogConfig } from './spyDecoratorLogger';

export type DecoratedFunction = {
	(): mixed,
	calls: Array<CallEntry>
};

/**
 * Decorates a function to be spied upon.
 * @param {Object} obj The object containing the function to spy on.
 * @param {string} functionName The name of the function to spy on.
 * @returns {Function} The decorated function.
 */
export default function spyFunctionDecorator(
	obj: any,
	functionName: string
): DecoratedFunction {
	const that: Spy = this;
	const calls: Array<CallEntry> = [];
	const logConfig: FunctionLogConfig = {
		obj,
		propName: functionName,
		args: [],
		calls,
		return: undefined
	};
	const originalFunction: () => mixed = obj[functionName];
	const decoratedFunction: DecoratedFunction = function decoratedFunction(
		...args: Array<any>
	): mixed {
		// call `fake` function instead of original if defined
		const baseFunction =
			typeof that.fake === 'function' ? that.fake : originalFunction;
		let returnVal: mixed;
		logger.info(`spied on ${functionName}`);

		// call functions
		if (that.callThrough) {
			if (typeof that.before === 'function') {
				try {
					that.before.apply(obj);
				} catch (error) {
					logger.error(
						`an error occurred while calling before: ${error.message}`
					);
				}
			}

			try {
				logConfig.args = clone(Array.from(args));
				returnVal = baseFunction.apply(obj, args);
				logConfig.return = clone(returnVal);
			} catch (error) {
				logger.error(
					`an error occurred while calling the spied function: ${error.message}`
				);
				logConfig.return = `Error: ${error.message}`;
			}

			if (typeof that.after === 'function') {
				try {
					that.after.apply(obj);
				} catch (error) {
					logger.error(
						`an error occurred while calling after: ${error.message}`
					);
				}
			}
		}

		// log function call
		spyDecoratorLogger(logConfig);
		return returnVal;
	};

	return decoratedFunction;
}
