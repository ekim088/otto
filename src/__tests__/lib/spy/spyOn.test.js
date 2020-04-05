/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import spyOn, { resetAllSpies, resetSpy } from '../../../lib/spy/spyOn';

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
		resetAllSpies();

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

	it('should spy on a non-method object property', () => {
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

	it('should reset a function spy', () => {
		const originalFunction = mockContext.fxnToSpyOn;
		spyOn(mockContext, 'fxnToSpyOn');
		resetSpy(mockContext, 'fxnToSpyOn');
		expect(mockContext.fxnToSpyOn).toBe(originalFunction);
	});

	it('should reset a non-method spy', () => {
		spyOn(mockContext, 'propToSpyOn');
		resetSpy(mockContext, 'propToSpyOn');
		expect(
			Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn').set
		).not.toBeDefined();
	});

	it('should reset all spies on a passed object', () => {
		mockContext.nestedObjProp.furtherNested = {};
		mockContext.nestedObjProp.furtherNested.anotherFxn = () => {};
		const originalNestedFunction = mockContext.nestedObjProp.nestedFxnToSpyOn;
		const furtherNestedFunction =
			mockContext.nestedObjProp.furtherNested.anotherFxn;
		spyOn(mockContext.nestedObjProp);
		resetSpy(mockContext.nestedObjProp);
		expect(mockContext.nestedObjProp.nestedFxnToSpyOn).toBe(
			originalNestedFunction
		);
		expect(
			Object.getOwnPropertyDescriptor(
				mockContext.nestedObjProp,
				'nestedPropToSpyOn'
			).set
		).not.toBeDefined();
		expect(mockContext.nestedObjProp.furtherNested.anotherFxn).toBe(
			furtherNestedFunction
		);
	});

	it('should reset all known spies on resetAllSpies', () => {
		const originalFunction = mockContext.fxnToSpyOn;
		const originalNestedFunction = mockContext.nestedObjProp.nestedFxnToSpyOn;
		const secondaryContext = {
			anotherFunction() {}
		};
		const originalFunctionInAnotherContext = secondaryContext.anotherFunction;

		spyOn(mockContext);
		spyOn(secondaryContext);
		expect(secondaryContext.anotherFunction).not.toBe(
			originalFunctionInAnotherContext
		);

		resetAllSpies();
		expect(mockContext.fxnToSpyOn).toBe(originalFunction);
		expect(mockContext.nestedObjProp.nestedFxnToSpyOn).toBe(
			originalNestedFunction
		);
		expect(
			Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn').set
		).not.toBeDefined();
		expect(
			Object.getOwnPropertyDescriptor(
				mockContext.nestedObjProp,
				'nestedPropToSpyOn'
			).set
		).not.toBeDefined();
		expect(secondaryContext.anotherFunction).toBe(
			originalFunctionInAnotherContext
		);
	});
});
