// @flow
import spyOn, { resetAllSpies, resetSpy } from './lib/spy/spyOn';
import object from './lib/utils/object';

const otto = { object, resetAllSpies, resetSpy, spyOn };

module.exports = otto;
