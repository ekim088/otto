import merge from '../../../lib/utils/merge';

describe('utils/merge', () => {
	it('should merge two objects together', () => {
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

	it('should not alter the second object when merging two objects', () => {
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
		obj1.b.f = 'updated';
		expect(obj2.b.f).toStrictEqual({ g: 7 });
	});

	it('should replace the first argument if the second is a primitive value', () => {
		const val1 = { a: 1 };
		const val2 = 'primitive';
		expect(merge(val1, val2)).toEqual('primitive');
	});
});
