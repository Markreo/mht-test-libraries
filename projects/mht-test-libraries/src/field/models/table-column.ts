import {BaseField} from './fields';

export class TableColumn {
  key: string;
  label: string;
  renderValue: (row) => string;
  field: BaseField;

  constructor(options: Partial<TableColumn> = {}) {
    this.key = options.key;
    this.label = options.label;
    this.renderValue = options.renderValue;
    this.field = options.field;
  }


}
