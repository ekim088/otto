// @flow
import { clone } from './object';
import logger from './logger';

export type CallEntry = {|
	args: Array<mixed>,
	return: mixed
|};

type FunctionCallLog = {|
	functionCall: true,
	calls: Array<CallEntry>
|};

type PropReadLog = {|
	propRead: true,
	reads: number
|};

type PropWriteLog = {|
	propWrite: true,
	writes: Array<mixed>
|};

export type SpyLog = {|
	obj: any,
	propName: ?string,
	update: FunctionCallLog | PropReadLog | PropWriteLog
|};

/**
 * Update record of interactions with the function or property. Initializes or
 * reapplies object's logging specific property to prevent overwriting.
 * @param {Object} config Log message configuration.
 */
export default function spyLogger(config: SpyLog): void {
	const { obj } = config;
	const { propName, update } = config;

	// initialize logging props on object
	obj._spy_ = typeof obj._spy_ === 'object' ? obj._spy_ : {};

	if (propName) {
		obj._spy_[propName] =
			typeof obj._spy_[propName] === 'object' ? obj._spy_[propName] : {};
	}

	// add new log entry
	if (update.propRead && propName) {
		const { reads } = update;
		obj._spy_[propName].reads = reads;
		logger.info(
			`read value of ${propName} a total of ${String(reads)} time${
				reads === 1 ? '' : 's'
			}`
		);
	} else if (update.propWrite && propName) {
		const { writes } = update;
		const newValue = writes[writes.length - 1];
		obj._spy_[propName].writes = clone(writes);
		logger.info(`value of ${propName} updated to ${String(newValue)}`);
	} else if (update.functionCall) {
		const calls = clone(update.calls);

		if (!propName) {
			obj.calls = calls;
		} else {
			obj[propName].calls = calls;
			obj._spy_[propName].calls = calls;
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
	const baseObj = obj;

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
