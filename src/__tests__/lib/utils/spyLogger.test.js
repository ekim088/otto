/* eslint-disable no-unused-expressions */
import decorateFunction, {
	revertDecoratedFunction
} from '../../../lib/utils/decorateFunction';
import decorateProperty, {
	revertDecoratedProperty
} from '../../../lib/utils/decorateProperty';
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
		mockContext = {
			log: [],
			propToDecorate: 'base',
			set propWithExistingSetter(val) {
				this.log.push(val);
			},
			get propWithExistingGetter() {
				return this.someProp;
			},
			someProp: 'some value',
			sum(num1, num2) {
				return num1 + num2;
			}
		};
	});

	afterAll(() => {
		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should maintain a log of calls to a decorated function', () => {
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
		decorateFunction(mockContext, 'sum');
		mockContext.sum();
		expect(mockContext.sum).toHaveProperty('calls');
		expect(mockContext._spy_).toHaveProperty('sum');

		revertDecoratedFunction(mockContext.sum);
		expect(mockContext.sum).not.toHaveProperty('calls');
		expect(mockContext).not.toHaveProperty('_spy_');
	});

	it('should prevent the log of function calls from being manipulated', () => {
		decorateFunction(mockContext, 'sum');
		mockContext.sum(1, 2);
		mockContext.sum.calls[0].args = [9, 9];
		mockContext.sum(1, 2);
		expect(mockContext.sum.calls[0].args).toStrictEqual([1, 2]);
	});

	it('should apply clones of function arguments and returns to the call log', () => {
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

	it('should maintain a log of writes to a decorated property', () => {
		decorateProperty(mockContext, 'propToDecorate');
		mockContext.propToDecorate = 'new1';
		mockContext.propToDecorate = 'new2';
		mockContext.propToDecorate = 'new3';
		expect(mockContext._spy_.propToDecorate.writes).toEqual([
			'new1',
			'new2',
			'new3'
		]);

		mockContext._spy_ = 'whoops';
		mockContext.propToDecorate = 'new4';
		expect(mockContext._spy_.propToDecorate.writes).toEqual([
			'new1',
			'new2',
			'new3',
			'new4'
		]);

		decorateProperty(mockContext, 'propWithExistingSetter');
		mockContext.propWithExistingSetter = 'test1';
		expect(mockContext._spy_.propWithExistingSetter.writes).toEqual(['test1']);
	});

	it('should maintain a log of reads to a decorated property', () => {
		decorateProperty(mockContext, 'propToDecorate');
		mockContext.propToDecorate;
		expect(mockContext._spy_.propToDecorate.reads).toEqual(1);

		mockContext.propToDecorate;
		expect(mockContext._spy_.propToDecorate.reads).toEqual(2);

		mockContext._spy_ = 'whoops';
		mockContext.propToDecorate;
		expect(mockContext._spy_.propToDecorate.reads).toEqual(3);

		decorateProperty(mockContext, 'propWithExistingGetter');
		mockContext.propWithExistingGetter;
		expect(mockContext._spy_.propWithExistingGetter.reads).toEqual(1);
	});

	it('should remove the log of updates once a decorated property has been reverted', () => {
		decorateProperty(mockContext, 'propToDecorate');
		mockContext.propToSpyOn = 'new1';
		revertDecoratedProperty(mockContext, 'propToDecorate');
		expect(mockContext).not.toHaveProperty('_spy_');
	});

	it('should prevent the log of writes from being manipulated', () => {
		decorateProperty(mockContext, 'propToDecorate');
		mockContext.propToDecorate = 'new1';
		mockContext.propToDecorate = 'new2';
		mockContext._spy_.propToDecorate.writes[1] = 'incorrect';
		mockContext.propToDecorate = 'new3';
		expect(mockContext._spy_.propToDecorate.writes).not.toContain('incorrect');
	});
});
