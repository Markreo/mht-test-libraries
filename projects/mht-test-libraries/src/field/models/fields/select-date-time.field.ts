import {BaseField} from './base.field';
import {FieldInjector} from '../../field-injector';
import {FormatDateFactory} from '../../functions';


export class SelectDateTimeField extends BaseField {
  format;

  constructor(options: Partial<SelectDateTimeField>) {
    super(options);
    this.format = options.format || 'dd/MM/yyyy HH:mm';
  }

  renderValue(row): string {
    return FieldInjector.get(FormatDateFactory).formatDate(new Date(), this.format)
  }
}
