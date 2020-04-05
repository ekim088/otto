// @flow
import Spy from './Spy';
import SpyOnModule from './SpyOnModule';
import { iterateAndCall } from '../utils/object';
import logger from '../utils/logger';

const spyManifest = new Map();

/**
 * Spies on the requested object property.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} [propName] The name of the property to spy on.
 */
export default function spyOn(obj: { ... }, propName?: string): SpyOnModule {
	const instantiatedSpies: Array<Spy> = [];

	/**
	 * Handler to spy on all object properties.
	 * @param {Object} src The object to spy on.
	 * @param {string} [key] The current object property name.
	 */
	function initializeSpies(src: { ... }, key: ?string): void {
		const val = typeof key === 'string' ? src[key] : src;

		if (typeof val === 'object' && val !== null) {
			// spy on all properties of object if val is an object
			iterateAndCall(val, initializeSpies);
		} else if (typeof key === 'string') {
			// spy on object property
			const deployedSpy = getSpyFromManifest(src, key);
			let spy;

			if (deployedSpy instanceof Spy && deployedSpy.active) {
				spy = deployedSpy;
			} else {
				spy = new Spy(src, key);
				addToSpyManifest(src, key, spy);
			}

			instantiatedSpies.push(spy);
		}
	}

	initializeSpies(obj, propName);
	return new SpyOnModule(obj, propName, instantiatedSpies);
}

/**
 * Adds a record of a new Spy to the spy manifest.
 * @param {Object} obj The object containing the spy.
 * @param {string} propName The name of the property containing the spy.
 * @param {Spy} spy The spy to add to the manifest.
 */
function addToSpyManifest(obj: { ... }, propName: string, spy: Spy): void {
	const spiesOnObject: { [string]: Spy } = spyManifest.get(obj) || {};
	spiesOnObject[propName] = spy;
	spyManifest.set(obj, spiesOnObject);
}

/**
 * Retrieves a Spy from the spy manifest.
 * @param {Object} obj The object containing the spy.
 * @param {string} propName The name of the property containing the spy.
 * @returns {Spy} The Spy watching the object property. Returns `undefined` if
 * 	Spy is unavailable.
 */
function getSpyFromManifest(obj: { ... }, propName: string): ?Spy {
	const spiesOnObject: ?{ [string]: Spy } = spyManifest.get(obj);
	return spiesOnObject && spiesOnObject[propName];
}

/**
 * Resets a spy on a given property or spies on an object.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} [propName] The name of the property to spy on.
 */
export function resetSpy(obj: { ... }, propName?: string): void {
	/**
	 * Handler to spy on all object properties.
	 * @param {Object} src The object to spy on.
	 * @param {string} [key] The current object property name.
	 */
	function resetSpies(src: { ... }, key: ?string): void {
		const val = typeof key === 'string' ? src[key] : src;

		if (typeof val === 'object' && val !== null) {
			// search for and reset spies on all properties of object
			iterateAndCall(val, resetSpies);
		} else if (typeof key === 'string') {
			// reset single spy
			const spyToReset: ?Spy = getSpyFromManifest(src, key);

			if (spyToReset instanceof Spy) {
				spyToReset.reset();
				logger.info(`reset spy at ${String(key)}`);
			}
		}
	}

	resetSpies(obj, propName);
}

/**
 * Resets all generated spies.
 * @param {Object} obj The object containing the property to spy on.
 * @param {string} [propName] The name of the property to spy on.
 */
export function resetAllSpies(): void {
	Spy.resetAllSpies();
}
