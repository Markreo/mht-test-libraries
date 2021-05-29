export class TableColumn {
  key: string;
  label: string;

  constructor(options: Partial<TableColumn> = {}) {
    this.key = options.key;
    this.label = options.label;
  }
}
