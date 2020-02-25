// @flow
import clone from './clone';
import logger from './logger';
import spyLogger, { deleteSpyLog } from './spyLogger';
import type { CallEntry, SpyLog } from './spyLogger';

export type DecoratedFunction = {
	(...args: Array<any>): any,
	calls?: Array<CallEntry>,
	...
};

export type FunctionDecoratorConfig = {
	after?: mixed => void,
	before?: (...args: Array<any>) => void,
	callThrough?: boolean,
	fake?: (...args: Array<any>) => mixed,
	thisArg?: mixed,
	...
};

type DecoratedFunctionsEntry = {|
	originalFunction: (...args: Array<any>) => any,
	obj?: { ... },
	functionName?: string
|};

/**
 * Map of decorated function to original function for use in resetting
 * decorators.
 * NOTE: Be wary of this endlessly growing. Investigate ways to safely
 * remove without losing the ability to locate the original function for a
 * directly/indirectly decorated function.
 */
const decoratedFunctions: Map<
	DecoratedFunction,
	DecoratedFunctionsEntry
> = new Map();

/**
 * Decorates a function. If a reference to a method is supplied
 * i.e. object['functionName'], the method will automatically be replaced with
 * the decorated version of the method. A reference to the decorated method
 * will still be returned.
 * @param {Object|Function} objOrFxn Either the object containing a method to
 * 	decorate or the function to decorate itself.
 * @param {string|Object} [fxnNameOrConfig] The name of the method to decorate
 * 	or configuration for function decoration if the function is passed as the
 * 	first argument.
 * @param {Object} [decoratorConfig] Configuration for function decoration if
 * 	the first two arguments are the object and name of function to decorate.
 * 	`after`: A function to call after the function to be decorated.
 * 	`before`: A function to call before the function to be decorated.
 * 	`callThrough`: A boolean indicating whether to progresss through the
 * 		function once called. Defaults to `true`.
 * 	`fake`: A function to call in place of the function to be decorated.
 * 	`thisArg`: The value to be passed as the `this` parameter to the target
 * 		function(s) when the decorated function is called. Also applies to
 * 		`after`, `before`, and `fake`. Defaults to `this` if decorating a
 * 		prototype method or the `objOrFxn` argument pased to `decorateFunction`.
 * @returns {Function} The decorated function.
 */
export default function decorateFunction(
	objOrFxn: { ... } | ((...args: Array<any>) => any),
	fxnNameOrConfig?: string | FunctionDecoratorConfig,
	decoratorConfig?: FunctionDecoratorConfig
): DecoratedFunction {
	const obj: { ... } | ((...args: Array<any>) => any) = objOrFxn;
	let functionName: ?string;
	let originalFunction: (...args: Array<any>) => any = () => undefined;

	// support decoration configuration on calling object itself
	let config: FunctionDecoratorConfig = this;

	// determine function to decorate based on known function signatures
	if (
		(typeof objOrFxn === 'object' || typeof objOrFxn === 'function') &&
		typeof fxnNameOrConfig === 'string'
	) {
		functionName = fxnNameOrConfig;
		originalFunction = obj[functionName];

		if (typeof decoratorConfig === 'object') {
			config = decoratorConfig;
		}
	} else if (typeof objOrFxn === 'function') {
		originalFunction = objOrFxn;

		if (typeof fxnNameOrConfig === 'object') {
			config = fxnNameOrConfig;
		}
	} else {
		throw new TypeError(
			'unknown combination of arguments for decorateFunction call'
		);
	}

	/**
	 * Support decoration configuration directly on function if not passed
	 * as an argument.
	 */
	config = config || originalFunction || {};

	// log of calls to decorated function
	const calls: Array<CallEntry> = [];

	// generate decorated function
	const decoratedFunction: DecoratedFunction = function decoratedFunction(
		...args: Array<any>
	): any {
		// determine decoration configuration
		const {
			after,
			before,
			callThrough = typeof config.callThrough === 'boolean'
				? config.callThrough
				: true,
			fake,
			thisArg = this || obj
		} = config;

		// call `fake` function instead of original if defined
		const baseFunction = typeof fake === 'function' ? fake : originalFunction;

		// store values for log
		const logArgs = clone(Array.from(args));
		let logReturn: any;
		let returnVal: any;

		logger.info(
			`called ${
				functionName
					? `decorated function ${functionName}`
					: 'a decorated function'
			}`
		);

		// call functions
		if (callThrough) {
			if (typeof before === 'function') {
				try {
					/**
					 * Call `before` with a copy of the decorated function's
					 * arguments.
					 */
					before.apply(thisArg, clone(Array.from(args)));
				} catch (error) {
					logger.error(
						`an error occurred while calling before: ${error.message}`
					);
				}
			}

			try {
				returnVal = baseFunction.apply(thisArg, args);
			} catch (error) {
				logger.error(
					`an error occurred while calling the decorated function: ${error.message}`
				);
				logReturn = `Error: ${error.message}`;
			}
		}

		/**
		 * Performs all tasks meant to be completed after completion of base
		 * function call.
		 */
		const onBaseFunctionCallComplete = (returnFromBase: mixed): any => {
			logReturn = logReturn || clone(returnFromBase);

			if (callThrough && typeof after === 'function') {
				try {
					/**
					 * Call `after` with a copy of decorated function's
					 * return value.
					 */
					after.call(thisArg, clone(returnFromBase));
				} catch (error) {
					logger.error(
						`an error occurred while calling after: ${error.message}`
					);
				}
			}

			// log function call and return result from original function
			spyLogger(
				({
					obj,
					propName: functionName,
					update: {
						functionCall: true,
						args: logArgs,
						calls,
						return: logReturn
					}
				}: SpyLog)
			);
			return returnFromBase;
		};

		return returnVal instanceof Promise
			? returnVal.then(resolvedVal => onBaseFunctionCallComplete(resolvedVal))
			: onBaseFunctionCallComplete(returnVal);
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
 * Returns a boolean asserting whether a function has been decorated via
 * `decorateFunction`.
 * @param {Function} func The function to test for decoration.
 * @returns {boolean} `true` if the function has been decorated via
 * 	`decorateFunction`; otherwise `false`.
 */
export function isDecoratedFunction(func: mixed): boolean {
	return (
		typeof func === 'function' &&
		decoratedFunctions.has(((func: any): DecoratedFunction))
	);
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
): ((...args: Array<any>) => any) | void {
	const entry: DecoratedFunctionsEntry | boolean | void =
		isDecoratedFunction(decoratedFunction) &&
		decoratedFunctions.get(decoratedFunction);
	let originalFunction: (...args: Array<any>) => any;

	if (typeof entry === 'object' && entry !== null) {
		const { obj, functionName } = entry;
		originalFunction = entry.originalFunction;

		/**
		 * Reapply custom function properties from decorated to original
		 * function to retain updates to values.
		 */
		Object.keys(decoratedFunction).forEach((prop: string) => {
			originalFunction[prop] = decoratedFunction[prop];
		});

		if (obj && functionName) {
			if (obj[functionName] === decoratedFunction) {
				obj[functionName] = originalFunction;
				deleteSpyLog(obj, functionName);
				logger.info(`removed decoration on function ${functionName}`);
			} else {
				logger.info(
					`the value of decorated function ${functionName} has since been updated and will not be reverted`
				);
			}
		}
	} else {
		logger.info('could not find a record of decorated function to revert');
	}

	return originalFunction;
}
