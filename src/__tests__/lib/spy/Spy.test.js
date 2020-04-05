/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import Spy from '../../../lib/spy/Spy';

describe('lib/Spy', () => {
	let mockContext;
	let originalFunction;
	let spy;

	beforeEach(() => {
		mockContext = {
			// for function decoration tests
			reliesOnThis() {
				this.toBeSpiedUpon();
			},
			toBeSpiedUpon: jest.fn(),
			toBeCalledByBeforeAfter: jest.fn(),

			// for property decoration tests
			log: [],
			propToSpyOn: 'base',
			set propWithExistingSetter(val) {
				this.log.push(val);
			},
			get propWithExistingGetter() {
				return this.someProp;
			},
			someProp: 'some value'
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

	it('should decorate a function to spy on', () => {
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

	it('should revert a decorated function on reset', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		spy.before = jest.fn();
		spy.after = jest.fn();
		spy.reset();
		expect(mockContext.toBeSpiedUpon).toBe(originalFunction);

		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
		expect(spy.before).not.toHaveBeenCalled();
		expect(spy.after).not.toHaveBeenCalled();
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

	it('should decorate a property to spy on', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		const setter = Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn')
			.set;
		expect(setter).toBeDefined();

		const getter = Object.getOwnPropertyDescriptor(mockContext, 'propToSpyOn')
			.get;
		expect(getter).toBeDefined();
	});

	it("should decorate a property's existing getter and setter functions to spy on", () => {
		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		spy = new Spy(mockContext, 'propWithExistingSetter');
		const decoratedSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(decoratedSetter).not.toBe(originalSetter);

		mockContext.propWithExistingSetter = 'updated';
		expect(mockContext.log[0]).toEqual('updated');

		const originalGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		spy = new Spy(mockContext, 'propWithExistingGetter');
		const decoratedGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		expect(decoratedGetter).not.toBe(originalGetter);
		expect(mockContext.propWithExistingGetter).toEqual('some value');
	});

	it('should revert a decorated property on reset', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		spy.reset();
		const propSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToSpyOn'
		).set;
		expect(propSetter).toBeUndefined();

		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		spy = new Spy(mockContext, 'propWithExistingSetter');
		spy.reset();
		const setterAfterReset = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(setterAfterReset).toBe(originalSetter);
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

	it('should correctly display active status when spying on methods', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		expect(spy.active).toBe(true);

		spy.reset();
		expect(spy.active).toBe(false);
	});

	it('should correctly display active status when spying on non-method properties', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		expect(spy.active).toBe(true);

		spy.reset();
		expect(spy.active).toBe(false);
	});
});
