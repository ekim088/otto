// @flow
import clone from './clone';
import logger from './logger';

type ReadLogConfig = {
	obj: any,
	propName: string,
	reads: number
};

type WriteLogConfig = {
	obj: any,
	originalValue: any,
	propName: string,
	newValue: any,
	writes: Array<any>
};

/**
 * Update record of number of gets and reapply spy log prop to prevent
 * overwriting.
 * @param {Object} config Log message configuration.
 */
const updateReadLog: ReadLogConfig => void = function({
	obj,
	propName,
	reads
}) {
	const baseObj: any = obj;
	logger.info(`read value of ${propName}`);
	baseObj._spy_ = typeof baseObj._spy_ === 'object' ? baseObj._spy_ : {};
	baseObj._spy_[propName] =
		typeof baseObj._spy_[propName] === 'object' ? baseObj._spy_[propName] : {};
	baseObj._spy_[propName].reads = reads;
};

/**
 * Update record of number of sets and reapply spy log prop to prevent
 * overwriting.
 * @param {Object} config Log message configuration.
 */
const updateWriteLog: WriteLogConfig => void = function({
	obj,
	originalValue,
	propName,
	newValue,
	writes
}) {
	const baseObj: any = obj;
	logger.info(
		`value of ${propName} updated from ${originalValue} to ${newValue}`
	);
	writes.push(clone(newValue));
	baseObj._spy_ = typeof baseObj._spy_ === 'object' ? baseObj._spy_ : {};
	baseObj._spy_[propName] =
		typeof baseObj._spy_[propName] === 'object' ? baseObj._spy_[propName] : {};
	baseObj._spy_[propName].writes = writes;
};

/**
 * Decorates a property's getter and setter to be spied upon.
 * NOTE: Immediately updates getter/setter methods to be spied. Returns a
 * reference to the original getter/setter so reset() can be defined in Spy.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 * @returns {Object} An object containing the original getter/setter if present.
 */
export default function spyGetSetDecorator(
	obj: any,
	propName: string
): {
	originalGetter: ?() => mixed,
	originalSetter: ?(any) => any
} {
	const descriptor: any = Object.getOwnPropertyDescriptor(obj, propName);
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
				updateReadLog({ obj, propName, reads });
				return propValue;
			},
			set(newValue) {
				const originalValue: any = propValue;
				propValue = newValue;
				updateWriteLog({ obj, originalValue, propName, newValue, writes });
			},
			configurable: true,
			enumerable: descriptor.enumerable
		});
	} else {
		if (descriptor.get) {
			// decorate getter if already defined
			originalGetter = descriptor.get;
			descriptor.get = function() {
				reads += 1;
				updateReadLog({ obj, propName, reads });
				return originalGetter.call(obj);
			};
		}

		if (descriptor.set) {
			// decorate setter if already defined
			originalSetter = descriptor.set;
			descriptor.set = function(newValue) {
				const originalValue: any = obj[propName];
				originalSetter.call(obj, newValue);
				updateWriteLog({ obj, originalValue, propName, newValue, writes });
			};
		}

		// update descriptor with decorated methods
		Object.defineProperty(obj, propName, descriptor);
	}

	return { originalGetter, originalSetter };
}
