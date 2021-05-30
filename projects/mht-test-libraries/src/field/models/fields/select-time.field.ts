import {SelectDateTimeField} from './select-date-time.field';

export class SelectTimeField extends SelectDateTimeField {
  constructor(options) {
    const init = {
      format: 'hh:mm'
    };
    super({...init, ...options});
  }
}
