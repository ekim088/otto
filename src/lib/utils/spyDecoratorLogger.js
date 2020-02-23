// @flow
import logger from './logger';

export type CallEntry = {
	args: Array<any>,
	return: mixed
};

export type FunctionLogConfig = {|
	args: Array<any>,
	calls: Array<CallEntry>,
	obj: any,
	propName: string,
	return: mixed
|};

export type PropReadLogConfig = {|
	obj: any,
	propName: string,
	reads: number
|};

export type PropWriteLogConfig = {|
	newValue: mixed,
	obj: { ... },
	originalValue: mixed,
	propName: string,
	writes: Array<any>
|};

/**
 * Update record of interactions with the function or property. Initializes or
 * reapplies object's logging specific property to prevent overwriting.
 * @param {Object} config Log message configuration.
 */
export default function spyDecoratorLogger(
	config: FunctionLogConfig | PropReadLogConfig | PropWriteLogConfig
): void {
	const { obj, propName } = config;
	// $FlowFixMe
	const calls: boolean | Array<CallEntry> =
		Array.isArray(config.calls) && config.calls;
	const reads = typeof config.reads !== 'undefined' && config.reads;
	const writes = Array.isArray(config.writes) && config.writes;

	// initialize logging props on object
	obj._spy_ = typeof obj._spy_ === 'object' ? obj._spy_ : {};

	if (reads || writes) {
		obj._spy_[propName] =
			typeof obj._spy_[propName] === 'object' ? obj._spy_[propName] : {};
	}

	// add new log entry
	if (reads) {
		obj._spy_[propName].reads = reads;
		logger.info(`read value of ${propName}`);
	} else if (writes) {
		const originalValue =
			typeof config.originalValue !== 'undefined' && config.originalValue;
		const newValue = typeof config.newValue !== 'undefined' && config.newValue;
		// $FlowFixMe
		writes.push(newValue);
		obj._spy_[propName].writes = writes;
		logger.info(
			`value of ${propName} updated from ${String(originalValue)} to ${String(
				newValue
			)}`
		);
	} else if (calls) {
		// $FlowFixMe
		const args: Array<any> =
			(typeof config.args !== 'undefined' && config.args) || [];
		// $FlowFixMe
		const returnVal = config.return;
		const entry: CallEntry = {
			args,
			return: returnVal
		};
		// $FlowFixMe
		calls.push(entry);

		if (obj && propName) {
			obj[propName].calls = calls;
			obj._spy_[propName] = calls;
		} else {
			obj.calls = calls;
		}
	}
}

/**
 * Deletes any properties set on object that have been used to log property
 * activity for Spy.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} propName The name of the property to spy on.
 */
export function deleteSpyLog(obj: any, propName: string) {
	const baseObj: any = obj;

	if (typeof baseObj._spy_ === 'object') {
		delete baseObj._spy_[propName];

		// delete entire _spy_ object if empty
		if (Object.keys(baseObj._spy_).length === 0) {
			delete baseObj._spy_;
		}
	}

	// delete call log from functions
	if (
		typeof baseObj[propName] === 'function' &&
		Array.isArray(baseObj[propName].calls)
	) {
		delete baseObj[propName].calls;
	}
}
