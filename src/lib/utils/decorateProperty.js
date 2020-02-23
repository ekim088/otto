// @flow
import decorateFunction, {
	isDecoratedFunction,
	revertDecoratedFunction
} from './decorateFunction';
import logger from './logger';
import spyDecoratorLogger, { deleteSpyLog } from './spyDecoratorLogger';
import type {
	DecoratedFunction,
	FunctionDecoratorConfig
} from './decorateFunction';
import type {
	PropReadLogConfig,
	PropWriteLogConfig
} from './spyDecoratorLogger';

type PropertyDescriptor<T> = {
	configurable?: boolean,
	enumerable?: boolean,
	get?: () => T,
	set?: (value: T) => void,
	value?: T,
	writable?: boolean,
	...
};

/**
 * Decorates a property's getter and setter to be spied upon.
 * NOTE: Immediately updates getter/setter methods to be spied. Returns a
 * reference to the original getter/setter so reset() can be defined in Spy.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 * @returns {Object} An object containing the original getter/setter if present.
 */
export default function decorateProperty(obj: { ... }, propName: string): void {
	const descriptor = Object.getOwnPropertyDescriptor(obj, propName);

	// maintain log of reads and writes
	const writes: Array<mixed> = [];
	let reads: number = 0;

	if (typeof descriptor === 'undefined') {
		logger.error(`${propName} is not a defined property`);
	} else if ('value' in descriptor && descriptor.writable) {
		// if no getter/setter defined
		let propValue: mixed = obj[propName];

		Object.defineProperty(obj, propName, {
			get() {
				reads += 1;
				spyDecoratorLogger(({ obj, propName, reads }: PropReadLogConfig));
				return propValue;
			},
			set(newValue: mixed) {
				const originalValue: mixed = propValue;
				spyDecoratorLogger(
					({
						obj,
						originalValue,
						propName,
						newValue,
						writes
					}: PropWriteLogConfig)
				);
				propValue = newValue;
			},
			configurable: true,
			enumerable: descriptor.enumerable
		});
	} else if (descriptor.configurable) {
		if (descriptor.get) {
			// decorate getter if already defined
			descriptor.get = decorateFunction(
				descriptor.get,
				({
					before() {
						reads += 1;
						spyDecoratorLogger(({ obj, propName, reads }: PropReadLogConfig));
					},
					thisArg: obj
				}: FunctionDecoratorConfig)
			);
		}

		if (descriptor.set) {
			// decorate setter if already defined
			descriptor.set = decorateFunction(
				descriptor.set,
				({
					before(newValue) {
						spyDecoratorLogger(
							({
								obj,
								originalValue: obj[propName],
								propName,
								newValue,
								writes
							}: PropWriteLogConfig)
						);
					},
					thisArg: obj
				}: FunctionDecoratorConfig)
			);
		}

		// update descriptor with decorated methods
		Object.defineProperty(obj, propName, descriptor);
	}
}

/**
 * Reverts property getter and setter decoration.
 * @param {Object} obj The object containing the property to revert.
 * @param {string} propName The name of the property to revert.
 */
export function revertDecoratedProperty(obj: { ... }, propName: string): void {
	// reset getter/setter
	const baseObject = obj;
	const descriptor = Object.getOwnPropertyDescriptor(obj, propName);

	if (descriptor && descriptor.configurable) {
		// do the opposite of the decorator
		if (
			!isDecoratedFunction(descriptor.get) &&
			!isDecoratedFunction(descriptor.set)
		) {
			const originalValue: mixed = baseObject[propName];
			delete baseObject[propName];
			baseObject[propName] = originalValue;
		} else {
			const { get, set, ...props } = descriptor;
			const newDescriptor: PropertyDescriptor<mixed> = { ...props };

			if (isDecoratedFunction(descriptor.get)) {
				newDescriptor.get = revertDecoratedFunction(
					((get: any): DecoratedFunction)
				);
			}

			if (isDecoratedFunction(descriptor.set)) {
				newDescriptor.set = revertDecoratedFunction(
					((set: any): DecoratedFunction)
				);
			}

			Object.defineProperty(baseObject, propName, newDescriptor);
		}
	}

	deleteSpyLog(obj, propName);
}
