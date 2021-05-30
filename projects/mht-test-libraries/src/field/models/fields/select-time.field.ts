import {SelectDateTimeField} from './select-date-time.field';

export class SelectTimeField extends SelectDateTimeField {
  constructor(options) {
    const init = {
      format: 'HH:mm'
    };
    super({...init, ...options});
  }
}
