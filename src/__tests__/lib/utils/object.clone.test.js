import { clone } from '../../../lib/utils/object';

describe('utils/object.clone', () => {
	it('should deep copy an object', () => {
		const original = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
		const clonedObj = clone(original);
		expect(clonedObj).toStrictEqual(original);
		expect(clonedObj.b).not.toBe(original.b);

		clonedObj.b.c = 100;
		expect(original.b.c).toEqual(3);
	});

	it('should deep copy an array', () => {
		const original = [1, 2, 3];
		const clonedArr = clone(original);
		expect(clonedArr).toStrictEqual(original);
		expect(Array.isArray(clonedArr)).toEqual(true);

		clonedArr[1] = 10;
		expect(original[1]).toEqual(2);
	});

	it('should return the original input if it is an unsupported type', () => {
		expect(clone(undefined)).toBe(undefined);
		expect(clone(null)).toBe(null);
		expect(clone(0)).toBe(0);
		expect(clone('')).toBe('');

		const someFunction = () => null;
		expect(clone(someFunction)).toBe(someFunction);
	});
});
