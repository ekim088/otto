// @flow
import logger from './logger';
import spyDecoratorLogger from './spyDecoratorLogger';
import type {
	PropReadLogConfig,
	PropWriteLogConfig
} from './spyDecoratorLogger';

export type PropertyDescriptor = {
	value?: any,
	writable?: boolean,
	get?: () => mixed | void,
	set?: () => void | void,
	configurable?: boolean,
	enumerable?: boolean
};

/**
 * Decorates a property's getter and setter to be spied upon.
 * NOTE: Immediately updates getter/setter methods to be spied. Returns a
 * reference to the original getter/setter so reset() can be defined in Spy.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 * @returns {Object} An object containing the original getter/setter if present.
 */
export default function decorateProperty(
	obj: any,
	propName: string
): {
	originalGetter: ?() => mixed,
	originalSetter: ?(any) => any
} {
	const descriptor: PropertyDescriptor =
		Object.getOwnPropertyDescriptor(obj, propName) || {};
	let originalGetter: () => mixed;
	let originalSetter: any => mixed;

	// maintain log of reads and writes
	const writes: Array<any> = [];
	let reads: number = 0;

	if (typeof descriptor === 'undefined') {
		logger.error(`${propName} is not a defined property`);
	} else if ('value' in descriptor && descriptor.writable) {
		// if no getter/setter defined
		let propValue: any = obj[propName];

		Object.defineProperty(obj, propName, {
			get() {
				reads += 1;
				spyDecoratorLogger(({ obj, propName, reads }: PropReadLogConfig));
				return propValue;
			},
			set(newValue) {
				const originalValue: any = propValue;
				propValue = newValue;
				spyDecoratorLogger(
					({
						obj,
						originalValue,
						propName,
						newValue,
						writes
					}: PropWriteLogConfig)
				);
			},
			configurable: true,
			enumerable: descriptor.enumerable
		});
	} else if (descriptor.configurable) {
		if (descriptor.get) {
			// decorate getter if already defined
			originalGetter = descriptor.get;
			descriptor.get = function() {
				reads += 1;
				spyDecoratorLogger(({ obj, propName, reads }: PropReadLogConfig));
				return originalGetter.call(obj);
			};
		}

		if (descriptor.set) {
			// decorate setter if already defined
			originalSetter = descriptor.set;
			descriptor.set = function(newValue) {
				const originalValue: any = obj[propName];
				originalSetter.call(obj, newValue);
				spyDecoratorLogger(
					({
						obj,
						originalValue,
						propName,
						newValue,
						writes
					}: PropWriteLogConfig)
				);
			};
		}

		// update descriptor with decorated methods
		Object.defineProperty(obj, propName, descriptor);
	}

	return { originalGetter, originalSetter };
}
