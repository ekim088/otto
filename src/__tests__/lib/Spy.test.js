import Spy from '../../lib/Spy';
import logger from '../../lib/utils/logger';

describe('lib/Spy', () => {
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

	it('should call the function being spied upon with the correct arguments', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		mockContext.toBeSpiedUpon('arg1', 'arg2', ['arg3']);
		expect(originalFunction).toHaveBeenCalledWith('arg1', 'arg2', ['arg3']);
	});

	it('should not call spied function if callThrough is disabled', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.callThrough = false;
		mockContext.toBeSpiedUpon();
		expect(originalFunction).not.toHaveBeenCalled();
	});

	it('should call the before function before the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.before).toHaveBeenCalledBefore(originalFunction);
	});

	it('should call the before function with the same context as the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = function() {
			this.toBeCalledByBeforeAfter();
		};
		mockContext.toBeSpiedUpon();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should call the after function after the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.after = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.after).toHaveBeenCalledAfter(originalFunction);
	});

	it('should call the after function with the same context as the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.after = function() {
			this.toBeCalledByBeforeAfter();
		};
		mockContext.toBeSpiedUpon();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should continue calling methods within the chain after an exception occurs', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = function() {
			throw new Error('throwing a test error');
		};
		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should maintain the same return as the spied function', () => {
		mockContext.newFunction = () => 'success';
		spy = new Spy(mockContext, 'newFunction');
		spy.before = jest.fn(() => 'failure');
		spy.after = jest.fn(() => 'failure');
		const result = mockContext.newFunction();
		expect(spy.before).toHaveBeenCalled();
		expect(spy.after).toHaveBeenCalled();
		expect(result).toEqual('success');
	});

	it('should revert the spied function on reset', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = jest.fn();
		spy.after = jest.fn();
		spy.reset();
		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
		expect(spy.before).not.toHaveBeenCalled();
		expect(spy.after).not.toHaveBeenCalled();
	});

	it('should maintain a log of calls to the spied function', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		spy = new Spy(mockContext, 'sum');
		expect(mockContext.sum.calls.length).toEqual(0);

		mockContext.sum(1, 1);
		expect(mockContext.sum.calls.length).toEqual(1);
		expect(mockContext.sum.calls[0]).toStrictEqual({
			args: [1, 1],
			return: 2
		});

		mockContext.sum(5, '6');
		expect(mockContext.sum.calls.length).toEqual(2);
		expect(mockContext.sum.calls[1]).toStrictEqual({
			args: [5, '6'],
			return: '56'
		});
	});

	it('should remove the log of calls to the spied function on reset', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		spy = new Spy(mockContext, 'sum');
		expect(typeof mockContext.sum.calls).toEqual('object');

		spy.reset();
		expect(typeof mockContext.sum.calls).toEqual('undefined');
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

	it('should spy on custom prop methods that may have been applied to the spied function', () => {
		mockContext.someFunction = () => null;
		mockContext.someFunction.testProp = 0;
		mockContext.someFunction.testMethod = function() {
			this.testProp += 1;
		};
		originalFunction = mockContext.someFunction;
		const originalPropMethod = mockContext.someFunction.testMethod;
		spy = new Spy(mockContext, 'someFunction');
		expect(mockContext.someFunction.testMethod).not.toBe(originalPropMethod);

		mockContext.someFunction.testMethod();
		expect(originalFunction.testProp).toEqual(1);
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
