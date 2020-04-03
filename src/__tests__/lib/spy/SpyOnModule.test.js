/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import SpyOnModule from '../../../lib/spy/SpyOnModule';
import spyOn from '../../../lib/spy/spyOn';

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

	it('should support calling fakes on spied functions', () => {
		const fakeFunction = jest.fn();
		const originalFunction = mockContext.fxnToSpyOn;

		spyOn(mockContext, 'fxnToSpyOn').and.callFake(fakeFunction);
		mockContext.fxnToSpyOn();
		expect(originalFunction).not.toHaveBeenCalled();
		expect(fakeFunction).toHaveBeenCalled();
	});

	it('should fail gracefully when calling callFake with invalid arguments', () => {
		expect(() => {
			spyOn(mockContext, 'fxnToSpyOn').and.callFake('invalid');
		}).not.toThrow();
	});
});
