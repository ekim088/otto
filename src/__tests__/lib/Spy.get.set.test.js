import logger from '../../lib/utils/logger';
import Spy from '../../lib/Spy';

describe('lib/Spy.get.set', () => {
	let mockContext;
	let spy;

	beforeEach(() => {
		mockContext = {
			log: [],
			propToSpyOn: 'base',
			set propWithExistingSetter(val) {
				this.log.push(val);
			},
			get propWithExistingGetter() {
				return 'got';
			}
		};

		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	afterEach(() => {
		if (spy instanceof Spy) {
			spy.reset();
		}

		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should decorate the setter of the property to spy on', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		const propSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToSpyOn'
		).set;
		expect(propSetter).not.toBe(undefined);
	});

	it('should call the original setter within the decorated setter if available', () => {
		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		spy = new Spy(mockContext, 'propWithExistingSetter');
		const newSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(newSetter).not.toBe(originalSetter);

		mockContext.propWithExistingSetter = 'updated';
		expect(mockContext.log[0]).toEqual('updated');
	});

	it('should remove the decorated setter on reset', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		spy.reset();
		const propSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToSpyOn'
		).set;
		expect(propSetter).toBe(undefined);
	});

	it('should return to the original setter on reset if available', () => {
		const originalSetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		spy = new Spy(mockContext, 'propWithExistingSetter');
		spy.reset();
		const setterAfterReset = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingSetter'
		).set;
		expect(setterAfterReset).toBe(originalSetter);
	});

	it('should maintain log of updates to the spied property', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		expect('_spy_' in mockContext).toBe(true);

		mockContext.propToSpyOn = 'new1';
		mockContext.propToSpyOn = 'new2';
		mockContext.propToSpyOn = 'new3';
		expect(mockContext._spy_.propToSpyOn).toEqual(['new1', 'new2', 'new3']);

		mockContext._spy_ = 'whoops';
		mockContext.propToSpyOn = 'new4';
		expect(mockContext._spy_.propToSpyOn).toEqual([
			'new1',
			'new2',
			'new3',
			'new4'
		]);
	});

	it('should remove the log of updates to the spied property on reset', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		spy.reset();
		expect('_spy_' in mockContext).toBe(false);
	});
});
