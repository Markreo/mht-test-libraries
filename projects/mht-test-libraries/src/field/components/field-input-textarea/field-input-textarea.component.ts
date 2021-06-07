import {Component, forwardRef} from '@angular/core';
import {Bound} from '../bound';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FieldBase} from '../field-base';


@Component({
  selector: 'lib-bound-input-textarea',
  template: `
    <div [formGroup]="form">
      <lib-field-input-textarea [field]="field" [formControlName]="field.key"></lib-field-input-textarea>
    </div>
  `
})
export class BoundInputTextareaComponent extends Bound {
}

@Component({
  selector: 'lib-field-input-textarea',
  template: `<textarea nz-input type="text"  [nzAutosize]="{ minRows: 2}" [(ngModel)]="value" [placeholder]="field?.label"></textarea>`,
  styleUrls: ['./field-input-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldInputTextareaComponent),
      multi: true
    }
  ]
})
export class FieldInputTextareaComponent extends FieldBase {
  constructor() {
    super();
  }
}

