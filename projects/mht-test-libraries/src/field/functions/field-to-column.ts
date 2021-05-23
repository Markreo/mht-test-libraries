import {FieldBase} from '../components/field-base';
import {TableColumn} from '../models/table-column';

export function fieldToColumn(field: FieldBase): TableColumn {
  return new TableColumn();
}
