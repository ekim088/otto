import clone from '../../../lib/utils/clone';

describe('utils/clone', () => {
	it('should deep copy an object', () => {
		const original = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
		const clonedObj = clone(original);
		expect(clonedObj).not.toBe(original);
		expect(clonedObj).toStrictEqual(original);
	});

	it('should clone an array', () => {
		const original = [1, 2, 3];
		const clonedArr = clone(original);
		expect(clonedArr).not.toBe(original);
		expect(clonedArr).toStrictEqual(original);
		expect(Array.isArray(clonedArr)).toEqual(true);
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
