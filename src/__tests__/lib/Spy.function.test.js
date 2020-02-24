/* eslint-disable no-unused-expressions */
import logger from '../../lib/utils/logger';
import Spy from '../../lib/Spy';

describe('lib/Spy.function', () => {
	let mockContext;
	let originalFunction;
	let spy;

	beforeEach(() => {
		mockContext = {
			reliesOnThis() {
				this.toBeSpiedUpon();
			},
			toBeSpiedUpon: jest.fn(),
			toBeCalledByBeforeAfter: jest.fn()
		};
		originalFunction = mockContext.toBeSpiedUpon;

		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	afterEach(() => {
		if (spy instanceof Spy) {
			spy.reset();
		}

		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should decorate the function to spy on', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		expect(mockContext.toBeSpiedUpon).not.toBe(originalFunction);

		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should support applying decoration configuration directly to spy after initialization', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.before).toHaveBeenCalledBefore(originalFunction);
	});

	it('should spy on functions applied directly to the spied function as properties', () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testProp = 0;
		mockContext.someFunction.testMethod = function() {
			this.testProp += 1;
		};
		const originalPropMethod = mockContext.someFunction.testMethod;
		spy = new Spy(mockContext, 'someFunction');
		expect(mockContext.someFunction.testMethod).not.toBe(originalPropMethod);

		mockContext.someFunction.testMethod();
		expect(mockContext.someFunction.testMethod.calls[0]).toStrictEqual({
			args: [],
			return: undefined
		});
		expect(mockContext.someFunction.testProp).toEqual(1);
	});

	it('should spy on non-method properties applied to the spied function', () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testProp = 0;
		spy = new Spy(mockContext, 'someFunction');
		mockContext.someFunction.testProp = 100;
		mockContext.someFunction.testProp;
		expect(mockContext.someFunction._spy_.testProp).toStrictEqual({
			reads: 1,
			writes: [100]
		});
	});

	it('should not overwrite properties on the function that are required for spying', () => {
		let x = 0;
		mockContext.someFunction = () => {
			x += 1;
			return x;
		};
		spy = new Spy(mockContext, 'someFunction');
		mockContext.someFunction.calls = 'invalid value';
		mockContext._spy_ = 'invalid value';
		mockContext.someFunction();
		expect(mockContext.someFunction.calls[0]).toStrictEqual({
			args: [],
			return: 1
		});
		expect(mockContext._spy_.someFunction.calls[0]).toStrictEqual({
			args: [],
			return: 1
		});

		mockContext.someFunction.calls = 'overwriting';
		mockContext._spy_ = 'overwriting';
		mockContext.someFunction();
		mockContext.someFunction();
		expect(mockContext.someFunction.calls[2]).toStrictEqual({
			args: [],
			return: 3
		});
		expect(mockContext._spy_.someFunction.calls[2]).toStrictEqual({
			args: [],
			return: 3
		});
	});

	it("should reset spies on a function's property methods when resetting the originally spied function", () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testMethod1 = function() {};
		mockContext.someFunction.testMethod2 = function() {};
		const originalPropMethod1 = mockContext.someFunction.testMethod1;
		const originalPropMethod2 = mockContext.someFunction.testMethod2;
		spy = new Spy(mockContext, 'someFunction');
		expect(mockContext.someFunction.testMethod1).not.toBe(originalPropMethod1);
		expect(mockContext.someFunction.testMethod2).not.toBe(originalPropMethod2);

		spy.reset();
		expect(mockContext.someFunction.testMethod1).toBe(originalPropMethod1);
		expect(mockContext.someFunction.testMethod2).toBe(originalPropMethod2);
	});

	it('should reset spies on non-method properties when resetting the originally spied function', () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testProp = 0;
		originalFunction = mockContext.someFunction;
		spy = new Spy(mockContext, 'someFunction');
		mockContext.someFunction.testProp = 200;
		spy.reset();
		expect(originalFunction.testProp).toEqual(200);
	});

	it('should reset all known spies on resetAllSpies', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		expect(mockContext.toBeSpiedUpon).not.toBe(originalFunction);

		mockContext.anotherFunctionToSpyOn = () => {};
		const originalAnotherFunction = mockContext.anotherFunctionToSpyOn;
		const anotherSpy = new Spy(mockContext, 'anotherFunctionToSpyOn');
		expect(mockContext.anotherFunctionToSpyOn).not.toBe(
			originalAnotherFunction
		);

		Spy.resetAllSpies();
		expect(mockContext.toBeSpiedUpon).toBe(originalFunction);
		expect(mockContext.anotherFunctionToSpyOn).toBe(originalAnotherFunction);
		anotherSpy.reset();
	});
});
