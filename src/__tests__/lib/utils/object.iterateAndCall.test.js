import { iterateAndCall } from '../../../lib/utils/object';

describe('utils/object.iterateAndCall', () => {
	let mockObject;

	beforeEach(() => {
		mockObject = {
			a: 1,
			b: {
				c: 3,
				d: 4
			}
		};
	});

	it('should call the handler function on each property of an object', () => {
		const mockHandler = jest.fn();
		iterateAndCall(mockObject, mockHandler);
		expect(mockHandler).toHaveBeenCalledTimes(2);
		expect(mockHandler).toHaveBeenCalledWith(mockObject, 'a');
		expect(mockHandler).toHaveBeenCalledWith(mockObject, 'b');
	});

	it('should only call the handler function if the optional condition is met', () => {
		const mockHandler = jest.fn();
		iterateAndCall(mockObject, mockHandler, (obj, key) => key === 'b');
		expect(mockHandler).toHaveBeenCalledTimes(1);
		expect(mockHandler).toHaveBeenCalledWith(mockObject, 'b');
	});

	it('should allow a condition to return a truthy value', () => {
		const mockHandler = jest.fn();
		iterateAndCall(mockObject, mockHandler, (obj, key) => key.replace('b', ''));
		expect(mockHandler).toHaveBeenCalledTimes(1);
		expect(mockHandler).toHaveBeenCalledWith(mockObject, 'a');
	});

	it('should update the property value if the handler function returns a defined value', () => {
		const referenceToB = mockObject.b;
		let mockHandler = () => {};
		iterateAndCall(mockObject, mockHandler);
		expect(mockObject.a).toBe(1);
		expect(mockObject.b).toBe(referenceToB);

		mockHandler = (obj, key) => `${String(obj[key])} updated`;
		iterateAndCall(mockObject, mockHandler);
		expect(mockObject.a).toBe('1 updated');
		expect(mockObject.b).toBe('[object Object] updated');
	});
});
