import traverse from '../../../lib/utils/traverse';

describe('utils/traverse', () => {
	const testObject = {
		a: {
			b: {
				c: 'success'
			},
			d: 'some value'
		}
	};

	it('should navigate to a nested object property', () => {
		expect(traverse(testObject, 'a.b.c')).toEqual('success');
	});

	it('should return undefined if the nested object property does not exist', () => {
		expect(traverse()).toEqual(undefined);
		expect(traverse(testObject, 'a.d.e')).toEqual(undefined);
	});
});
