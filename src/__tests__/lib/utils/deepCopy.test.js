import deepCopy from '../../../lib/utils/deepCopy';

describe('utils/deepCopy', () => {
	it('should make a deep copy of an object', () => {
		const original = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
		const clone = deepCopy(original);
		expect(clone).toStrictEqual(original);

		clone.b.c = 100;
		expect(original.b.c).toStrictEqual(3);
	});

	it('should return the original input if it is not an object', () => {
		expect(deepCopy(undefined)).toBe(undefined);
		expect(deepCopy(0)).toBe(0);
		expect(deepCopy('')).toBe('');
	});
});
