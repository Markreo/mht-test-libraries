import {BaseField} from './base.field';
import {formatDate} from '@angular/common';

export class SelectDateTimeField extends BaseField {
  format = 'dd/MM/yyy HH:mm';

  renderValue(row): string {
    return formatDate(row[this.key], this.format, 'vi-VN');
  }
}
