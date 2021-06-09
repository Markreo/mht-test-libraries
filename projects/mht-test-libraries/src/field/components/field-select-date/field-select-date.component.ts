import {Component, forwardRef, OnInit} from '@angular/core';
import {Bound} from '../bound';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FieldBase} from '../field-base';

@Component({
  selector: 'lib-bound-select-date',
  template: `
    <div *ngIf="field" [formGroup]="form">
      <nz-date-picker [formControlName]="field.key" [nzPlaceHolder]="field.label"></nz-date-picker>
    </div>
  `
})
export class BoundSelectDateComponent extends Bound {
}

@Component({
  selector: 'lib-field-select-date',
  template: '<nz-date-picker [(ngModel)]="value" [nzPlaceHolder]="field?.label"></nz-date-picker>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldSelectDateComponent),
      multi: true
    }
  ]
})
export class FieldSelectDateComponent extends FieldBase {
  constructor() {
    super();
  }
}

