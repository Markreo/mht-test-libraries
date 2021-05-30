export class TableColumn {
  key: string;
  label: string;
  renderValue: (row) => string;

  constructor(options: Partial<TableColumn> = {}) {
    this.key = options.key;
    this.label = options.label;
    this.renderValue = options.renderValue;
  }


}
