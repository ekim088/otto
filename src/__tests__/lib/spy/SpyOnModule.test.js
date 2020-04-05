/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import SpyOnModule from '../../../lib/spy/SpyOnModule';
import spyOn, { resetAllSpies } from '../../../lib/spy/spyOn';

describe('lib/SpyOnModule', () => {
	let mockContext;

	beforeEach(() => {
		mockContext = {
			fxnToSpyOn: jest.fn(),
			propToSpyOn: 'some value',
			nestedObjProp: {
				nestedFxnToSpyOn: jest.fn(),
				nestedPropToSpyOn: 'another value'
			}
		};

		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	afterEach(() => {
		resetAllSpies();

		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should support method chaining by returning a chainable module after each spy function call', () => {
		expect(spyOn(mockContext, 'fxnToSpyOn')).toBeInstanceOf(SpyOnModule);
	});

	it('should return itself on and', () => {
		const chainable = spyOn(mockContext, 'fxnToSpyOn');
		expect(chainable.and).toBe(chainable);
	});

	it('should support calling a fake function in place of the spied function', () => {
		const fakeFunction = jest.fn();
		const originalFunction = mockContext.fxnToSpyOn;

		spyOn(mockContext, 'fxnToSpyOn').and.callFake(fakeFunction);
		mockContext.fxnToSpyOn();
		expect(originalFunction).not.toHaveBeenCalled();
		expect(fakeFunction).toHaveBeenCalled();
	});

	it('should return itself on callFake', () => {
		const chainable = spyOn(mockContext, 'fxnToSpyOn');
		expect(chainable.and.callFake(() => undefined)).toBe(chainable);
	});

	it('should support calling a function before calling the spied function', () => {
		const beforeFxn = jest.fn();
		const originalFunction = mockContext.fxnToSpyOn;

		spyOn(mockContext, 'fxnToSpyOn').and.callBefore(beforeFxn);
		mockContext.fxnToSpyOn();
		expect(beforeFxn).toHaveBeenCalledBefore(originalFunction);
	});

	it('should return itself on callBefore', () => {
		const chainable = spyOn(mockContext, 'fxnToSpyOn');
		expect(chainable.and.callBefore(() => undefined)).toBe(chainable);
	});

	it('should support calling a function after calling the spied function', () => {
		const afterFxn = jest.fn();
		const originalFunction = mockContext.fxnToSpyOn;

		spyOn(mockContext, 'fxnToSpyOn').and.callAfter(afterFxn);
		mockContext.fxnToSpyOn();
		expect(afterFxn).toHaveBeenCalledAfter(originalFunction);
	});

	it('should return itself on callAfter', () => {
		const chainable = spyOn(mockContext, 'fxnToSpyOn');
		expect(chainable.and.callAfter(() => undefined)).toBe(chainable);
	});

	it('should fail gracefully when calling module methods with invalid arguments', () => {
		expect(() => {
			spyOn(mockContext, 'fxnToSpyOn').and.callFake('invalid');
		}).not.toThrow();

		expect(() => {
			spyOn(mockContext, 'fxnToSpyOn').and.callBefore('invalid');
		}).not.toThrow();

		expect(() => {
			spyOn(mockContext, 'fxnToSpyOn').and.callAfter('invalid');
		}).not.toThrow();
	});
});
