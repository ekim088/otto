// @flow
import clone from './clone';
import logger from './logger';

type LogConfig = {
	log: Array<any>,
	obj: any,
	originalValue: any,
	propName: string,
	newValue: any
};

/**
 * Add spied update to log and reapply spy log prop to prevent
 * overwriting.
 * @param {Object} config Log message configuration.
 */
const updateLog: LogConfig => void = function({
	log,
	obj,
	originalValue,
	propName,
	newValue
}) {
	const baseObj: any = obj;
	logger.info(
		`value of ${propName} updated from ${originalValue} to ${newValue}`
	);
	log.push(clone(newValue));
	baseObj._spy_ = typeof baseObj._spy_ === 'object' ? baseObj._spy_ : {};
	baseObj._spy_[propName] = log;
};

/**
 * Decorates a property's getter and setter to be spied upon.
 * NOTE: Immediately updates getter/setter methods to be spied. Returns a
 * reference to the original getter/setter so reset() can be defined in Spy.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 * @returns {Function|undefined} The original setter if present.
 */
export default function spyGetSetDecorator(
	obj: any,
	propName: string
): ?(any) => any {
	const baseObj: any = obj;
	const descriptor: any = Object.getOwnPropertyDescriptor(obj, propName);
	const log: Array<any> = [];
	let originalSetter: any => any;

	if (typeof descriptor === 'undefined') {
		logger.error(`${propName} is not a defined property`);
		// if no getter/setter defined
	} else if ('value' in descriptor && descriptor.writable) {
		let propValue: any = obj[propName];

		Object.defineProperty(obj, propName, {
			get() {
				return propValue;
			},
			set(newValue) {
				const originalValue: any = propValue;
				propValue = newValue;
				updateLog({ log, obj, originalValue, propName, newValue });
			},
			configurable: true,
			enumerable: descriptor.enumerable
		});
		// if custom setter already defined
	} else if (descriptor.set) {
		// decorate the setter
		originalSetter = descriptor.set;
		descriptor.set = function(newValue) {
			const originalValue: any = obj[propName];
			originalSetter.call(obj, newValue);
			updateLog({ log, obj, originalValue, propName, newValue });
		};

		// update setter with decorated setter
		Object.defineProperty(obj, propName, descriptor);
	}

	// apply log specific property on base object
	baseObj._spy_ = baseObj._spy_ || {};

	return originalSetter;
}
