/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import spyOn from '../../../lib/spy/spyOn';

describe('lib/spyOn', () => {
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

	it('should spy on an object method', () => {
		const originalFunction = mockContext.fxnToSpyOn;
		spyOn(mockContext, 'fxnToSpyOn');
		expect(mockContext.fxnToSpyOn).not.toBe(originalFunction);

		mockContext.fxnToSpyOn();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should spy on an object property', () => {
		expect(
			Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn').set
		).not.toBeDefined();

		spyOn(mockContext, 'propToSpyOn');
		expect(
			Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn').set
		).toBeDefined();
	});

	it('should spy on an all object properties if property is not specified', () => {
		const originalFunction = mockContext.fxnToSpyOn;
		const originalNestedFunction = mockContext.nestedObjProp.nestedFxnToSpyOn;
		spyOn(mockContext);
		expect(mockContext.fxnToSpyOn).not.toBe(originalFunction);
		expect(mockContext.nestedObjProp.nestedFxnToSpyOn).not.toBe(
			originalNestedFunction
		);

		mockContext.fxnToSpyOn();
		expect(originalFunction).toHaveBeenCalled();

		mockContext.nestedObjProp.nestedFxnToSpyOn();
		expect(originalNestedFunction).toHaveBeenCalled();

		expect(
			Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn').set
		).toBeDefined();

		expect(
			Object.getOwnPropertyDescriptor(
				mockContext.nestedObjProp,
				'nestedPropToSpyOn'
			).set
		).toBeDefined();
	});
});
