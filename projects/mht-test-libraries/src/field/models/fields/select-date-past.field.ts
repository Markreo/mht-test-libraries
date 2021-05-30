import {SelectDateField} from './select-date.field';

export class SelectDatePastField extends SelectDateField {
  constructor(options) {
    const init = {
      format: 'DD/MM/YYYY'
    };
    super({...init, ...options});
  }
}
