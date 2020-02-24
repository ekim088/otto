import decorateProperty, {
	revertDecoratedProperty
} from '../../../lib/utils/decorateProperty';
import logger from '../../../lib/utils/logger';

describe('utils/decorateProperty', () => {
	let mockContext;

	beforeAll(() => {
		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	beforeEach(() => {
		mockContext = {
			log: [],
			propToDecorate: 'base',
			set propWithExistingSetter(val) {
				this.log.push(val);
			},
			get propWithExistingGetter() {
				return this.someProp;
			},
			someProp: 'some value'
		};
	});

	afterAll(() => {
		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should create a setter function for a property without one', () => {
		decorateProperty(mockContext, 'propToDecorate');
		const setter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToDecorate'
		).set;
		expect(setter).toBeDefined();
	});

	it('should create a getter function for a property without one', () => {
		decorateProperty(mockContext, 'propToDecorate');
		const getter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToDecorate'
		).get;
		expect(getter).toBeDefined();
	});

	it("should decorate a property's existing setter function if defined", () => {
		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		decorateProperty(mockContext, 'propWithExistingSetter');
		const decoratedSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(decoratedSetter).not.toBe(originalSetter);

		mockContext.propWithExistingSetter = 'updated';
		expect(mockContext.log[0]).toEqual('updated');
	});

	it("should decorate a property's existing getter function if defined", () => {
		const originalGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		decorateProperty(mockContext, 'propWithExistingGetter');
		const decoratedGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		expect(decoratedGetter).not.toBe(originalGetter);
		expect(mockContext.propWithExistingGetter).toEqual('some value');
	});

	it('should remove the applied setter function on revertDecoratedProperty if the property did not originally define one', () => {
		decorateProperty(mockContext, 'propToDecorate');
		revertDecoratedProperty(mockContext, 'propToDecorate');
		const propSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToDecorate'
		).set;
		expect(propSetter).toBeUndefined();
	});

	it('should remove the applied getter function on revertDecoratedProperty if the property did not originally define one', () => {
		decorateProperty(mockContext, 'propToDecorate');
		revertDecoratedProperty(mockContext, 'propToDecorate');
		const propGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToDecorate'
		).get;
		expect(propGetter).toBeUndefined();
	});

	it("should revert to a property's original setter function on revertDecoratedProperty", () => {
		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		decorateProperty(mockContext, 'propWithExistingSetter');
		revertDecoratedProperty(mockContext, 'propWithExistingSetter');
		const setterAfterReset = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(setterAfterReset).toBe(originalSetter);
	});

	it("should revert to a property's original getter function on revertDecoratedProperty", () => {
		const originalGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		decorateProperty(mockContext, 'propWithExistingGetter');
		revertDecoratedProperty(mockContext, 'propWithExistingGetter');
		const getterAfterReset = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		expect(getterAfterReset).toBe(originalGetter);
	});
});
