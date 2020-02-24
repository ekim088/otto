import decorateFunction, {
	revertDecoratedFunction
} from '../../../lib/utils/decorateFunction';
import logger from '../../../lib/utils/logger';

describe('utils/spyLogger', () => {
	let mockContext;

	beforeAll(() => {
		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	beforeEach(() => {
		mockContext = {};
	});

	afterAll(() => {
		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should maintain a log of calls to decorated functions', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		decorateFunction(mockContext, 'sum');
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

	it('should remove the log of calls once a decorated function has been reverted', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		decorateFunction(mockContext, 'sum');
		mockContext.sum();
		expect(mockContext.sum.calls).toBeDefined();
		expect(mockContext._spy_.sum).toBeDefined();

		revertDecoratedFunction(mockContext.sum);
		expect(mockContext.sum.calls).not.toBeDefined();
		expect(mockContext._spy_).not.toBeDefined();
	});

	it('should apply clones of function arguments and returns to the call log', () => {
		mockContext.sum = (num1, num2) => num1 + num2;
		decorateFunction(mockContext, 'sum');
		const obj = { a: 1 };

		mockContext.sum(1, obj);
		expect(mockContext.sum.calls[0]).toStrictEqual({
			args: [1, { a: 1 }],
			return: '1[object Object]'
		});

		obj.a = 3;
		expect(mockContext.sum.calls[0].args[1].a).toEqual(1);
	});
});
