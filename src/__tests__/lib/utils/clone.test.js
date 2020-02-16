import clone from '../../../lib/utils/clone';

describe('utils/clone', () => {
	it('should make a deep copy of an object', () => {
		const original = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
		const clonedObj = clone(original);
		expect(clonedObj).toStrictEqual(original);

		clonedObj.b.c = 100;
		expect(original.b.c).toStrictEqual(3);
	});

	it('should return the original input if it is not an object', () => {
		expect(clone(undefined)).toBe(undefined);
		expect(clone(0)).toBe(0);
		expect(clone('')).toBe('');
	});
});
