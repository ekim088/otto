// @flow
import { deleteSpyLog } from './utils/spyDecoratorLogger';
import decorateFunction, {
	revertDecoratedFunction
} from './utils/decorateFunction';
import decorateProperty from './utils/decorateProperty';
import type { DecoratedFunction } from './utils/decorateFunction';
import type { PropertyDescriptor } from './utils/decorateProperty';

/**
 * Custom function properties that should not be spied as they are generated by
 * function decoration.
 */
const reservedProps: Array<string> = [
	'calls',
	'after',
	'before',
	'callThrough',
	'fake'
];

// Maintains a list of all instantiated spies.
const spyList = [];

/**
 * Decorates a function to be spied upon.
 * @param {Object} obj The object containing the function to spy on.
 * @param {string} functionName The name of the function to spy on.
 */
function decorateFunctionForSpy(obj: any, functionName: string): void {
	/**
	 * Additional Spies deployed by this Spy to spy on custom methods
	 * attached to the original function being spied on.
	 */
	const additionalSpies: Array<Spy> = [];
	const decoratedFunction: DecoratedFunction = decorateFunction.call(
		this,
		obj,
		functionName
	);

	// spy on custom function properties that had been applied to spied function
	Object.keys(decoratedFunction)
		.filter((prop: string): boolean => reservedProps.indexOf(prop) === -1)
		.forEach((prop: string): number =>
			additionalSpies.push(new Spy(decoratedFunction, prop))
		);

	// initialize reset method for function spies
	this.reset = (): void => {
		additionalSpies.forEach((spy: Spy): void => spy.reset());
		revertDecoratedFunction(decoratedFunction);
	};
}

/**
 * Decorates a property's getter/setter to be spied upon.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 */
function decoratePropertyForSpy(obj: any, propName: string): void {
	const baseObject: any = obj;
	const { originalGetter, originalSetter } = decorateProperty(obj, propName);

	// initialize reset method for property spies
	this.reset = (): void => {
		// reset getter/setter
		const descriptor: ?PropertyDescriptor = Object.getOwnPropertyDescriptor(
			obj,
			propName
		);

		if (descriptor && descriptor.configurable) {
			// do the opposite of the decorator
			if (!originalGetter && !originalSetter) {
				const originalValue: any = baseObject[propName];
				delete baseObject[propName];
				baseObject[propName] = originalValue;
			} else {
				const { get, set, ...rest } = descriptor;
				const newDescriptor: PropertyDescriptor = { ...rest };

				if (originalGetter) {
					newDescriptor.get = originalGetter;
				}

				if (originalSetter) {
					newDescriptor.set = originalSetter;
				}

				Object.defineProperty(baseObject, propName, newDescriptor);
			}
		}

		deleteSpyLog(obj, propName);
	};
}

export default class Spy {
	// flow annotations
	after: ?() => mixed;

	before: ?() => mixed;

	callThrough: boolean;

	fake: ?() => mixed;

	reset: () => void;

	/**
	 * Monitor and respond to function calls and property value updates.
	 * @constructor
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 */
	constructor(obj: any, propName: string) {
		if (!obj || !(propName in obj)) {
			throw new TypeError('must spy on defined object property');
		}

		// initiate spying
		this.callThrough = true;
		this.reset = () => undefined;
		this.initiate(obj, propName);

		// add Spy to instantiated list
		spyList.push(this);
	}

	/**
	 * Initiates spying.
	 * @param {Object} obj The object containing the property to spy on.
	 * @param {string} propName The name of the property to spy on.
	 */
	initiate(obj: any, propName: string): void {
		// decorate property with either function or getter/setter decorator
		const decorator: (any, string) => mixed =
			typeof obj[propName] === 'function'
				? decorateFunctionForSpy
				: decoratePropertyForSpy;
		decorator.call(this, obj, propName);
	}

	// Resets all known instantiated spies.
	static resetAllSpies(): void {
		spyList.forEach((spy: Spy): void => spy.reset());
	}
}
