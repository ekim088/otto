/* eslint-disable no-unused-expressions */
import logger from '../../../lib/utils/logger';
import { isValidHtml } from '../../../lib/utils/element';

describe('lib/element.isValidHtml', () => {
	beforeEach(() => {
		// silence logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = true;
		});
	});

	afterEach(() => {
		// re-enable logging
		logger.transports.forEach(t => {
			const transport = t;
			transport.silent = false;
		});
	});

	it('should correctly identify a valid HTML string', () => {
		expect(isValidHtml('<div class="test">It\'s valid</div>')).toBe(true);
		// expect(isValidHtml('<div cla>ss="test">It\'s invalid</div>')).toBe(false);
	});
});
