// @flow
import spyOn, { resetAllSpies, resetSpy } from './lib/spy/spyOn';
import object from './lib/utils/object';

/**
 * The main `otto` module containing object spying methods and varioys utility
 * functions. This module contains the `object` module in addition to the
 * static methods applied to `otto`.
 * @module otto
 * @see module:otto/object
 */

const otto = { object, resetAllSpies, resetSpy, spyOn };

module.exports = otto;
