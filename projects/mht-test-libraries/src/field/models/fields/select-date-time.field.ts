import {BaseField} from './base.field';
import {FieldInjector} from '../../field-injector';
import {BuildEndpointFactory, FormatDateFactory} from '../../functions';

export class SelectDateTimeField extends BaseField {
  format = 'dd/MM/yyy HH:mm';


  constructor(options: Partial<SelectDateTimeField>) {
    super(options);
  }

  renderValue(row): string {
    const factory = FieldInjector.get(BuildEndpointFactory);
    return factory.buildUrl(row[this.key]);
  }
}
