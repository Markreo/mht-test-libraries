import {TableColumn} from '../models/table-column';
import {BaseField} from '../models/fields';

export function fieldToColumn(field: BaseField): TableColumn {
  return new TableColumn({
    key: field.key,
    label: field.label,
    renderValue: (row) => {
      return field.renderValue(row);
    },
    field
  });
}
