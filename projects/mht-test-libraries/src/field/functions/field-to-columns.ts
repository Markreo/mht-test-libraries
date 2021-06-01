import {TableColumn} from '../models/table-column';
import {BaseField} from '../models/fields';
import {fieldToColumn} from './field-to-column';

export function fieldToColumns(fields: BaseField[]): TableColumn[] {
  if (fields && Array.isArray(fields)) {
    return fields.map(field => fieldToColumn(field));
  } else {
    return [];
  }
}
