/* eslint-disable no-unused-expressions */
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
				return this.someProp;
			},
			someProp: 'some value'
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

	it('should decorate the getter of the property to spy on', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		const propGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToSpyOn'
		).get;
		expect(propGetter).not.toBe(undefined);
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

	it('should call the original getter within the decorated getter if available', () => {
		const originalGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		spy = new Spy(mockContext, 'propWithExistingGetter');
		const newGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		expect(newGetter).not.toBe(originalGetter);
		expect(mockContext.propWithExistingGetter).toEqual('some value');
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

	it('should remove the decorated getter on reset', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		spy.reset();
		const propGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propToSpyOn'
		).get;
		expect(propGetter).toBe(undefined);
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

	it('should return to the original getter on reset if available', () => {
		const originalGetter = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		spy = new Spy(mockContext, 'propWithExistingGetter');
		spy.reset();
		const getterAfterReset = Object.getOwnPropertyDescriptor(
			mockContext,
			'propWithExistingGetter'
		).get;
		expect(getterAfterReset).toBe(originalGetter);
	});

	it('should maintain a log of writes to the spied property', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		mockContext.propToSpyOn = 'new1';
		mockContext.propToSpyOn = 'new2';
		mockContext.propToSpyOn = 'new3';
		expect(mockContext._spy_.propToSpyOn.writes).toEqual([
			'new1',
			'new2',
			'new3'
		]);

		mockContext._spy_ = 'whoops';
		mockContext.propToSpyOn = 'new4';
		expect(mockContext._spy_.propToSpyOn.writes).toEqual([
			'new1',
			'new2',
			'new3',
			'new4'
		]);

		spy = new Spy(mockContext, 'propWithExistingSetter');
		mockContext.propWithExistingSetter = 'test1';
		expect(mockContext._spy_.propWithExistingSetter.writes).toEqual(['test1']);
	});

	it('should maintain a log of reads to the spied property', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		mockContext.propToSpyOn;
		expect(mockContext._spy_.propToSpyOn.reads).toEqual(1);

		mockContext.propToSpyOn;
		expect(mockContext._spy_.propToSpyOn.reads).toEqual(2);

		mockContext._spy_ = 'whoops';
		mockContext.propToSpyOn;
		expect(mockContext._spy_.propToSpyOn.reads).toEqual(3);

		spy = new Spy(mockContext, 'propWithExistingGetter');
		mockContext.propWithExistingGetter;
		expect(mockContext._spy_.propWithExistingGetter.reads).toEqual(1);
	});

	it('should remove the log of updates to the spied property on reset', () => {
		spy = new Spy(mockContext, 'propToSpyOn');
		mockContext.propToSpyOn = 'new1';
		spy.reset();
		expect('_spy_' in mockContext).toBe(false);
	});
});
