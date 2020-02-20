// @flow
import clone from './clone';
import logger from './logger';
import spyDecoratorLogger from './spyDecoratorLogger';
import type { CallEntry, FunctionLogConfig } from './spyDecoratorLogger';

export type DecoratedFunction = {
	(): mixed,
	calls: ?Array<CallEntry>
};

export type FunctionDecoratorConfig = {|
	after?: () => void,
	before?: () => void,
	callThrough?: boolean,
	fake?: () => mixed
|};

type FunctionWithDecorationConfiguration = {
	(): mixed,
	after?: () => void,
	before?: () => void,
	callThrough?: boolean,
	fake?: () => mixed
};

/**
 * Decorates a function to be spied upon.
 * @param {Object|Function} objOrFxn The object containing the function to spy
 * 	on or the function itself.
 * @param {string|Object} [fxnNameOrConfig] The name of the function to spy on
 * 	or configuration for function decoration if the function is passed as the
 * 	first argument.
 * @param {Object} [config] Configuration for function decoration if the first
 * 	two arguments are the object and name of function to spy on.
 * @returns {Function} The decorated function.
 */
export default function decorateFunction(
	objOrFxn: any | FunctionWithDecorationConfiguration,
	...decorationArgs: Array<any>
): DecoratedFunction {
	let functionName: string = '';
	const obj: any | FunctionWithDecorationConfiguration = objOrFxn;
	let originalFunction: FunctionWithDecorationConfiguration = objOrFxn;

	// support decoration configuration on calling object itself
	let config: FunctionDecoratorConfig = this || originalFunction || {};

	// determine function to decorate based on known function signatures
	if (
		(typeof objOrFxn === 'object' || typeof objOrFxn === 'function') &&
		typeof decorationArgs[0] === 'string'
	) {
		[functionName, config = config] = decorationArgs;
		originalFunction = obj[functionName];
	} else if (typeof objOrFxn === 'function') {
		[config = config] = decorationArgs;
	} else {
		throw new TypeError(
			'unknown combination of arguments for decorateFunction call'
		);
	}

	// log of calls to decorated function
	const calls: Array<CallEntry> = [];

	// generate decorated function
	const decoratedFunction: DecoratedFunction = function decoratedFunction(
		...args: Array<any>
	): mixed {
		// determine decoration configuration
		const {
			after,
			before,
			callThrough = typeof config.callThrough === 'boolean'
				? config.callThrough
				: true,
			fake
		} = config;

		// call `fake` function instead of original if defined
		const baseFunction: () => mixed =
			typeof fake === 'function' ? fake : originalFunction;

		// configuration for generating log entry to `calls` array
		const logConfig: FunctionLogConfig = {
			args: clone(Array.from(args)),
			calls,
			obj,
			propName: functionName,
			return: undefined
		};
		let returnVal: mixed;

		logger.info(`spied on ${functionName}`);

		// call functions
		if (callThrough) {
			if (typeof before === 'function') {
				try {
					before.apply(obj);
				} catch (error) {
					logger.error(
						`an error occurred while calling before: ${error.message}`
					);
				}
			}

			try {
				returnVal = baseFunction.apply(obj, args);
				logConfig.return = clone(returnVal);
			} catch (error) {
				logger.error(
					`an error occurred while calling the spied function: ${error.message}`
				);
				logConfig.return = `Error: ${error.message}`;
			}

			if (typeof after === 'function') {
				try {
					after.apply(obj);
				} catch (error) {
					logger.error(
						`an error occurred while calling after: ${error.message}`
					);
				}
			}
		}

		// log function call and return result from original function
		spyDecoratorLogger(logConfig);
		return returnVal;
	};

	// duplicate custom properties on original function
	Object.keys(originalFunction).forEach((prop: string): void => {
		decoratedFunction[prop] = originalFunction[prop];
	});

	return decoratedFunction;
}
