import {SelectDateTimeField} from './select-date-time.field';

export class SelectDateField extends SelectDateTimeField {

  constructor(options: Partial<SelectDateField> = {}) {
    const init = {
      format: 'DD/MM/YYYY'
    };
    super({...init, ...options});
  }
}
