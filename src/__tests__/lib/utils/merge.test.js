import merge from '../../../lib/utils/merge';

describe('utils/merge', () => {
	it('should merge two objects together', () => {
		const obj1 = {
			a: 1,
			b: {
				c: 3,
				d: 4
			},
			e: 1
		};
		const obj2 = {
			e: 5,
			b: {
				f: {
					g: 7
				}
			}
		};
		const expectedObj = {
			a: 1,
			b: {
				c: 3,
				d: 4,
				f: {
					g: 7
				}
			},
			e: 5
		};
		expect(merge(obj1, obj2)).toStrictEqual(expectedObj);
	});

	it('should accept any number of objects to merge into the base object', () => {
		const obj1 = { a: 1, c: 3 };
		const obj2 = { b: 2 };
		const obj3 = {
			c: {
				d: 4,
				e: 5
			}
		};
		const expectedObj = {
			a: 1,
			b: 2,
			c: {
				d: 4,
				e: 5
			}
		};
		expect(merge(obj1, obj2, obj3)).toStrictEqual(expectedObj);
	});

	it('should not alter the objects being merged in', () => {
		const obj1 = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
		const obj2 = {
			e: 5,
			b: {
				f: {
					g: 7
				}
			}
		};
		merge(obj1, obj2);
		expect(obj1.b.f).not.toBe(obj2.b.f);

		obj1.b.f = 'updated';
		expect(obj2.b.f).toStrictEqual({ g: 7 });
	});

	it('should replace the first argument if the second is a primitive value', () => {
		const val1 = { a: 1 };
		const val2 = 'primitive';
		expect(merge(val1, val2)).toEqual('primitive');
	});

	it('should apply function props onto a base object or function', () => {
		const sum = (num1, num2) => num1 + num2;
		const someFunction = () => null;
		const someObject = {};
		sum.a = 1;
		sum.b = { c: 3 };
		merge(someFunction, sum);
		expect(someFunction.a).toEqual(sum.a);
		expect(someFunction.b).not.toBe(sum.b);
		expect(someFunction.b).toStrictEqual(sum.b);

		merge(someObject, sum);
		expect(someObject.b).not.toBe(sum.b);
		expect(someObject).toStrictEqual({
			a: 1,
			b: { c: 3 }
		});
	});

	it('should merge an array into an object', () => {
		const arr = [1, 2, 3];
		const merged = merge({ a: 1 }, arr);
		const expectedMerge = {
			a: 1,
			'0': 1,
			'1': 2,
			'2': 3
		};
		expect(merged).toStrictEqual(expectedMerge);
	});
});
