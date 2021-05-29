import {TableColumn} from '../models/table-column';
import {BaseField} from '../models/fields/base.field';

export function fieldToColumn(field: BaseField): TableColumn {
  return new TableColumn({
    key: field.key,
    label: field.label
  });
}
