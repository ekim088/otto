import mirrorProperties from '../../../lib/utils/mirrorProperties';

describe('utils/mirrorProperties', () => {
	it('should make a shallow copy of properties from an object onto the target object', () => {
		const target = {
			a: 1,
			b: 2
		};
		const source = {
			c: 3,
			d: 4
		};
		const expected = {
			a: 1,
			b: 2,
			c: 3,
			d: 4
		};
		mirrorProperties(target, source);
		expect(target).toStrictEqual(expected);
	});

	it('should accept any number of sources to mirror onto the target', () => {
		const target = {
			a: 1,
			b: 2
		};
		const source1 = {
			c: 3,
			d: 4
		};
		const source2 = {
			e: 5,
			f: 6
		};
		const expected = {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
			e: 5,
			f: 6
		};
		mirrorProperties(target, source1, source2);
		expect(target).toStrictEqual(expected);
	});

	it('should not alter the sources being mirrored', () => {
		const target = {
			a: 1,
			b: 2
		};
		const source = {
			c: 3,
			d: 4
		};
		const expected = {
			c: 3,
			d: 4
		};
		mirrorProperties(target, source);
		expect(source).toStrictEqual(expected);
	});

	it('should mirror properties on functions', () => {
		const target = function() {};
		const source = function() {};
		source.prop1 = 'some value 1';
		source.prop2 = 'some value 2';
		mirrorProperties(target, source);
		expect(target).toHaveProperty('prop1', 'some value 1');
		expect(target).toHaveProperty('prop2', 'some value 2');
	});
});
