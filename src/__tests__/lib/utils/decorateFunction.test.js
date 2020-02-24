/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import decorateFunction, {
	revertDecoratedFunction
} from '../../../lib/utils/decorateFunction';

describe('utils/decorateFunction', () => {
	let mockContext;
	let originalFunction;
	let decoratedFunction;

	beforeEach(() => {
		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});

		mockContext = {
			reliesOnThis() {
				this.toBeDecorated();
			},
			toBeDecorated: jest.fn(),
			toBeCalledByBeforeAfter: jest.fn()
		};
		originalFunction = mockContext.toBeDecorated;
	});

	afterEach(() => {
		revertDecoratedFunction(decoratedFunction);

		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should decorate a function passed as a method on an object', () => {
		decorateFunction(mockContext, 'toBeDecorated');
		expect(mockContext.toBeDecorated).not.toBe(originalFunction);

		mockContext.toBeDecorated();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should decorate a function passed directly', () => {
		decoratedFunction = decorateFunction(mockContext.toBeDecorated);
		expect(decoratedFunction).not.toBe(originalFunction);

		decoratedFunction();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should call the decorated function with the supplied arguments', () => {
		decorateFunction(mockContext.toBeDecorated);
		mockContext.toBeDecorated('arg1', 'arg2', ['arg3']);
		expect(originalFunction).toHaveBeenCalledWith('arg1', 'arg2', ['arg3']);
	});

	it('should not call the decorated function if callThrough is disabled', () => {
		decorateFunction(mockContext, 'toBeDecorated', { callThrough: false });
		mockContext.toBeDecorated();
		expect(originalFunction).not.toHaveBeenCalled();
	});

	it('should call the before function before the decorated function', () => {
		const before = jest.fn();
		decorateFunction(mockContext, 'toBeDecorated', { before });
		mockContext.toBeDecorated();
		expect(before).toHaveBeenCalledBefore(originalFunction);
	});

	it('should call the after function after the decorated function', () => {
		const after = jest.fn();
		decorateFunction(mockContext, 'toBeDecorated', { after });
		mockContext.toBeDecorated();
		expect(after).toHaveBeenCalledAfter(originalFunction);
	});

	it('should call the before function with the same context as the decorated function', () => {
		const before = function() {
			this.toBeCalledByBeforeAfter();
		};
		decorateFunction(mockContext, 'toBeDecorated', { before });
		mockContext.toBeDecorated();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should call the after function with the same context as the decorated function', () => {
		const after = function() {
			this.toBeCalledByBeforeAfter();
		};
		decorateFunction(mockContext, 'toBeDecorated', { after });
		mockContext.toBeDecorated();
		expect(mockContext.toBeCalledByBeforeAfter).toHaveBeenCalled();
	});

	it('should allow the decorated and after functions to be called if an error is thrown in the before or decorated function', () => {
		const after = jest.fn();
		const before = function() {
			throw new Error('throwing a test error');
		};
		decorateFunction(mockContext, 'toBeDecorated', { before, after });
		mockContext.toBeDecorated();
		expect(originalFunction).toHaveBeenCalled();
		expect(after).toHaveBeenCalledAfter(originalFunction);
	});

	it('should maintain the same return as the decorated function', () => {
		mockContext.newFunction = () => 'success';
		const before = jest.fn(() => 'failure');
		const after = jest.fn(() => 'failure');
		decorateFunction(mockContext, 'newFunction', { before, after });
		expect(mockContext.newFunction()).toEqual('success');
		expect(before).toHaveBeenCalled();
		expect(after).toHaveBeenCalled();
	});

	it('should revert the decorated function on revertDecoratedFunction', () => {
		const before = jest.fn();
		const after = jest.fn();
		decorateFunction(mockContext, 'toBeDecorated', { before, after });
		revertDecoratedFunction(mockContext.toBeDecorated);
		expect(mockContext.toBeDecorated).toBe(originalFunction);

		mockContext.toBeDecorated();
		expect(originalFunction).toHaveBeenCalled();
		expect(before).not.toHaveBeenCalled();
		expect(after).not.toHaveBeenCalled();
	});

	it('should not throw an error on revertDecoratedFunction if called without a decorated function', () => {
		expect(() => {
			revertDecoratedFunction(null);
		}).not.toThrow();
	});

	it('should not revert the decorated function on reset if the property value of the decorated function has been altered', () => {
		decorateFunction(mockContext, 'toBeDecorated');
		mockContext.toBeDecorated = 'some other value';
		revertDecoratedFunction(mockContext.toBeDecorated);
		expect(mockContext.toBeDecorated).toEqual('some other value');
	});

	it('should not revert or throw an error on revert if the object containing the decorated function has been altered', () => {
		decoratedFunction = decorateFunction(mockContext, 'toBeDecorated');
		mockContext = null;
		expect(() => {
			revertDecoratedFunction(decoratedFunction);
		}).not.toThrow();
		expect(mockContext).toEqual(null);
	});

	it('should support decoration configuration if a function is passed directly', () => {
		const before = jest.fn(() => {});
		decoratedFunction = decorateFunction(mockContext.toBeDecorated, { before });
		decoratedFunction();
		expect(before).toHaveBeenCalledBefore(originalFunction);
	});

	it('should support applying decoration configuration on the function itself', () => {
		mockContext.toBeDecorated.before = jest.fn(() => {});
		decoratedFunction = decorateFunction(mockContext.toBeDecorated);
		decoratedFunction();
		expect(mockContext.toBeDecorated.before).toHaveBeenCalledBefore(
			originalFunction
		);
	});

	// TODO: add testts for isDecoratedFunction()
});
