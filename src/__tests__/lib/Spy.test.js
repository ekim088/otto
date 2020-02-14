import Spy from '../../lib/Spy';

describe('lib/Spy', () => {
	let mockContext;
	let originalFunction;
	let spy;

	beforeEach(() => {
		mockContext = {
			reliesOnThis() {
				this.toBeSpiedUpon();
			},
			toBeSpiedUpon: jest.fn(() => {
				console.log('output from the original function');
			})
		};
		originalFunction = mockContext.toBeSpiedUpon;
	});

	afterEach(() => {
		spy.reset();
	});

	it('should decorate the function to spy on', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		expect(mockContext.toBeSpiedUpon).not.toBe(originalFunction);

		mockContext.toBeSpiedUpon();
		expect(originalFunction).toHaveBeenCalled();
	});

	it('should call the function being spied upon with the correct arguments', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon', true);
		mockContext.toBeSpiedUpon('arg1', 'arg2', ['arg3']);
		expect(originalFunction).toHaveBeenCalledWith('arg1', 'arg2', ['arg3']);
	});

	it('should not call spied function if callThrough is disabled', () => {
		spy = new Spy(mockContext, 'toBeSpiedUpon');
		mockContext.toBeSpiedUpon();
		expect(originalFunction).not.toHaveBeenCalled();
	});
});
