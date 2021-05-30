import {BaseField} from './base.field';
import {FieldInjector} from '../../field-injector';
import {FormatDateFactory} from '../../functions';

const moment = require('moment');

export class SelectDateTimeField extends BaseField {
  format;
  factory: FormatDateFactory;

  constructor(options: Partial<SelectDateTimeField>) {
    super(options);
    console.log('set');
    this.format = options.format || 'DD/MM/YYYY hh:mm';
    this.factory = FieldInjector.get(FormatDateFactory);
  }

  renderValue(row): string {
    console.log('row[this.key]', row[this.key]);
    console.log('this.format', this.format);
    return new moment(row[this.key]).format(this.format);
  }
}
