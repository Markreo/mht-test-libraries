import {BaseField} from './base.field';

export class SelectObjectField extends BaseField {
  endpoint: string;

  constructor(options: Partial<SelectObjectField> = {}) {
    super(options);
    this.endpoint = options.endpoint;
  }
}
