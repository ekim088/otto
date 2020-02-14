import Spy from '../../lib/Spy';

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
	});

	afterEach(() => spy && spy.reset());

	it('should decorate the function to spy on', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		expect(mockContext.toBeSpiedUpon).not.toBe(originalFunction);

		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should call the function being spied upon with the correct arguments', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		mockContext.toBeSpiedUpon('arg1', 'arg2', ['arg3']);
		expect(originalFunction).toHaveBeenCalledWith('arg1', 'arg2', ['arg3']);
	});

	it('should not call spied function if callThrough is disabled', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		mockContext.toBeSpiedUpon();
		expect(originalFunction).not.toHaveBeenCalled();
	});

	it('should call the before function before the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		spy.before = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.before).toHaveBeenCalledBefore(originalFunction);
	});

	it('should call the before function with the same context as the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		spy.before = function() {
			this.toBeCalledByBeforeAfter();
		};
		mockContext.toBeSpiedUpon();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should call the after function after the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		spy.after = jest.fn();
		mockContext.toBeSpiedUpon();
		expect(spy.after).toHaveBeenCalledAfter(originalFunction);
	});

	it('should call the after function with the same context as the spied function', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		spy.after = function() {
			this.toBeCalledByBeforeAfter();
		};
		mockContext.toBeSpiedUpon();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should continue calling methods within the chain after an exception occurs', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		spy.before = function() {
			throw new Error('throwing a test error');
		};
		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should maintain the same return as the spied function', () => {
		mockContext.newFunction = () => 'success';
		spy = new Spy(mockContext, 'newFunction', true);
		spy.before = jest.fn(() => 'failure');
		spy.after = jest.fn(() => 'failure');
		const result = mockContext.newFunction();
		expect(spy.before).toHaveBeenCalled();
		expect(spy.after).toHaveBeenCalled();
		expect(result).toEqual('success');
	});

	it('should revert the spied function on reset', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
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
		spy = new Spy(mockContext, 'sum', true);
		expect(spy.calls.length).toEqual(0);

		expect(mockContext.sum(1, 1)).toEqual(2);
		expect(spy.calls.length).toEqual(1);
		expect(spy.calls[0].arguments).toEqual([1, 1]);
		expect(spy.calls[0].return).toEqual(2);
	});
});
