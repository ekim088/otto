// @flow
import decorateFunction from './decorateFunction';
import logger from './logger';
import spyDecoratorLogger from './spyDecoratorLogger';
import type {
	DecoratedFunction,
	FunctionDecoratorConfig
} from './decorateFunction';
import type {
	PropReadLogConfig,
	PropWriteLogConfig
} from './spyDecoratorLogger';

export type PropertyDescriptor = {
	value?: any,
	writable?: boolean,
	get?: (() => any) | DecoratedFunction,
	set?: (any => void) | DecoratedFunction,
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
	originalGetter: ?() => any,
	originalSetter: ?(any) => void
} {
	const descriptor: PropertyDescriptor =
		Object.getOwnPropertyDescriptor(obj, propName) || {};
	let originalGetter: () => any;
	let originalSetter: any => void;

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
			originalGetter = descriptor.get;
			descriptor.get = decorateFunction(
				originalGetter.bind(obj),
				({
					before() {
						reads += 1;
						spyDecoratorLogger(({ obj, propName, reads }: PropReadLogConfig));
					}
				}: FunctionDecoratorConfig)
			);
		}

		if (descriptor.set) {
			// decorate setter if already defined
			originalSetter = descriptor.set;
			descriptor.set = decorateFunction(
				originalSetter.bind(obj),
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
					}
				}: FunctionDecoratorConfig)
			);
		}

		// update descriptor with decorated methods
		Object.defineProperty(obj, propName, descriptor);
	}

	return { originalGetter, originalSetter };
}
