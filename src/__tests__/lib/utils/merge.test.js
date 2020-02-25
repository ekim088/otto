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

	it('should replace the base element if the element to be merged in is a primitive value or function', () => {
		let val1 = { a: 1 };
		let val2 = 'primitive';
		expect(merge(val1, val2)).toEqual('primitive');

		val1 = { a: 1 };
		val2 = () => {};
		expect(merge(val1, val2)).toEqual(val2);

		val1 = { a: 1 };
		val2 = undefined;
		expect(merge(val1, val2)).toEqual(undefined);

		val1 = { a: 1 };
		val2 = null;
		expect(merge(val1, val2)).toEqual(null);
	});

	it('should merge an array into an object', () => {
		const target = {
			a: 1,
			b: 2
		};
		const source = {
			b: [{ a: 1, b: 2 }],
			c: 3
		};
		const merged = merge(target, source);
		const expectedMerge = {
			a: 1,
			b: [{ a: 1, b: 2 }],
			c: 3
		};
		expect(merged).toStrictEqual(expectedMerge);
		expect(merged.b).not.toBe(source.b);
		expect(merged.b[0]).not.toBe(source.b[0]);
	});
});
