import {Component, Input} from '@angular/core';
import {BaseField} from '../models/fields';
import {FormGroup} from '@angular/forms';

@Component({template: ''})
// tslint:disable-next-line:component-class-suffix
export class Bound {
  @Input() field: BaseField;
  @Input() form: FormGroup;
}
