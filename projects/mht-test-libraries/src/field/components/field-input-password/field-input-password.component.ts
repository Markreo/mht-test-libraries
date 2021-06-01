import {Component, forwardRef, OnInit} from '@angular/core';
import {Bound} from '../bound';
import {FieldBase} from '../field-base';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lib-bound-input-password',
  template: `
    <div [formGroup]="form">
      <lib-field-input-password [field]="field" [formControlName]="field.key"></lib-field-input-password>
    </div>
  `
})
export class BoundInputPasswordComponent extends Bound implements OnInit {
  ngOnInit(): void {
  }
}

@Component({
  selector: 'lib-field-input-password',
  template: `<input nz-input type="password" [(ngModel)]="value" [placeholder]="field?.label">`,
  styleUrls: ['./field-input-password.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldInputPasswordComponent),
      multi: true
    }
  ]
})
export class FieldInputPasswordComponent extends FieldBase {
  constructor() {
    super();
  }
}
