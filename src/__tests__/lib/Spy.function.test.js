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

	// TODO: review placement of tests below

	it('should maintain a log of calls to the spied function', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		spy = new Spy(mockContext, 'sum');
		expect(mockContext.sum.calls).not.toBeDefined();
		expect(mockContext._spy_).not.toBeDefined();

		mockContext.sum(1, 1);
		expect(mockContext.sum.calls.length).toEqual(1);
		expect(mockContext._spy_.sum.calls.length).toEqual(1);
		expect(mockContext.sum.calls[0]).toStrictEqual({
			args: [1, 1],
			return: 2
		});
		expect(mockContext._spy_.sum.calls[0]).toStrictEqual({
			args: [1, 1],
			return: 2
		});

		mockContext.sum(5, '6');
		expect(mockContext.sum.calls.length).toEqual(2);
		expect(mockContext._spy_.sum.calls.length).toEqual(2);
		expect(mockContext.sum.calls[1]).toStrictEqual({
			args: [5, '6'],
			return: '56'
		});
		expect(mockContext._spy_.sum.calls[1]).toStrictEqual({
			args: [5, '6'],
			return: '56'
		});
	});

	it('should remove the log of calls to the spied function on reset', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		spy = new Spy(mockContext, 'sum');
		mockContext.sum();
		expect(mockContext.sum.calls).toBeDefined();
		expect(mockContext._spy_.sum).toBeDefined();

		spy.reset();
		expect(mockContext.sum.calls).not.toBeDefined();
		expect(mockContext._spy_).not.toBeDefined();
	});

	it('should make copies of original arguments and returns in the call log', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		spy = new Spy(mockContext, 'sum');
		const obj = { a: 1 };

		mockContext.sum(1, obj);
		expect(mockContext.sum.calls[0]).toStrictEqual({
			args: [1, { a: 1 }],
			return: '1[object Object]'
		});

		obj.a = 3;
		expect(mockContext.sum.calls[0].args[1].a).toEqual(1);
	});

	it('should maintain custom props from the original function to the spied function', () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testProp = 0;
		mockContext.someFunction.testMethod = function() {
			this.testProp += 1;
		};
		spy = new Spy(mockContext, 'someFunction');
		expect(mockContext.someFunction).toHaveProperty('testProp');
		expect(mockContext.someFunction).toHaveProperty('testMethod');
	});

	it('should spy on custom prop methods that may have been applied to the spied function', () => {
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

	it('should spy on non-method custom props that have been applied to the spied function', () => {
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

	it('should not overwrite function props that are required for spying', () => {
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

	it('should reset spies on custom prop methods when resetting the originally spied method', () => {
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

	it('should reset spies on non-method custom props when resetting the originally spied method', () => {
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

	it('should call a fake function instead of the original spied function if defined', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.fake = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(originalFunction).not.toHaveBeenCalled();
		expect(spy.fake).toHaveBeenCalled();
	});

	it('should call before and after functions if fake is defined', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = jest.fn();
		spy.after = jest.fn();
		spy.fake = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.before).toHaveBeenCalledBefore(spy.fake);
		expect(spy.after).toHaveBeenCalledAfter(spy.fake);
	});
});
