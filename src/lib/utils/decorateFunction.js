// @flow
import clone from './clone';
import logger from './logger';
import spyDecoratorLogger, { deleteSpyLog } from './spyDecoratorLogger';
import type { CallEntry, FunctionLogConfig } from './spyDecoratorLogger';

export type DecoratedFunction = {
	(): mixed,
	calls: ?Array<CallEntry>
};

export type FunctionDecoratorConfig = {
	after?: () => void,
	before?: () => void,
	callThrough?: boolean,
	fake?: () => mixed
};

type FunctionWithDecorationConfiguration = {
	(): mixed,
	after?: () => void,
	before?: () => void,
	callThrough?: boolean,
	fake?: () => mixed
};

type DecoratedFunctionsEntry = {
	originalFunction: () => mixed | FunctionWithDecorationConfiguration,
	obj?: any,
	functionName?: string
};

/**
 * Map of decorated function to original function for use in resetting
 * decorators.
 */
const decoratedFunctions: Map<
	DecoratedFunction,
	DecoratedFunctionsEntry
> = new Map();

/**
 * Decorates a function to be spied upon. If a reference to a method is supplied
 * i.e. object['functionName'], the method will automatically be replaced with
 * the decorated version of the method. A reference to the decorated method
 * will still be returned.
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

	// storage object in decorated functions map
	const decoratedFunctionsEntry: DecoratedFunctionsEntry = { originalFunction };

	// duplicate custom properties on original function
	Object.keys(originalFunction).forEach((prop: string): void => {
		decoratedFunction[prop] = originalFunction[prop];
	});

	// swap original with decorated function if method reference supplied
	if (obj && functionName) {
		obj[functionName] = decoratedFunction;
		decoratedFunctionsEntry.obj = obj;
		decoratedFunctionsEntry.functionName = functionName;
		logger.info(`successfully decorated function ${functionName}`);
	}

	// store function to decorated function map
	decoratedFunctions.set(decoratedFunction, decoratedFunctionsEntry);

	return decoratedFunction;
}

/**
 * Reverts function decoration. If a reference to a method had been originally
 * supplied i.e. object['functionName'], the decorated method will automatically
 * be reverted to the original method. A reference to the original method will
 * still be returned.
 * @param {Function} decoratedFunction The decorated function to revert.
 * @returns {Function} The original function.
 */
export function revertDecoratedFunction(
	decoratedFunction: DecoratedFunction
): ?() => mixed | FunctionWithDecorationConfiguration {
	const entry: DecoratedFunctionsEntry | void = decoratedFunctions.get(
		decoratedFunction
	);
	let originalFunction: () => mixed | FunctionWithDecorationConfiguration;

	if (typeof entry !== 'undefined') {
		const { obj, functionName } = entry;
		originalFunction = entry.originalFunction;

		/**
		 * Reapply custom function properties from decorated to original
		 * function to retain updates to values.
		 */
		Object.keys(decoratedFunction).forEach((prop: string): void => {
			originalFunction[prop] = decoratedFunction[prop];
		});

		if (obj && functionName) {
			obj[functionName] = originalFunction;
			deleteSpyLog(obj, functionName);
			logger.info(`removed decoration on function ${functionName}`);
		}
	} else {
		logger.info('could not find a record of decorated function to revert');
	}

	return originalFunction;
}
