import {BaseField} from './base.field';

export class SelectObjectField extends BaseField {
  endpoint: string;

  constructor(options: Partial<SelectObjectField> = {}) {
    super(options);
    this.endpoint = options.endpoint;
  }

  renderValue(row): string {
    if (row[this.key]) {
      return `<a src="">${row[this.key].name}</a>`;
    } else {
      return '';
    }
  }
}
