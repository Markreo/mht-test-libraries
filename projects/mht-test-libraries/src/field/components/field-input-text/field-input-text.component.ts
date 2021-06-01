import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FieldBase} from '../field-base';
import {Bound} from '../bound';

@Component({
  selector: 'lib-bound-input-text',
  template: `
    <div [formGroup]="form">
      <lib-field-input-text [field]="field" [formControlName]="field.key"></lib-field-input-text>
    </div>
  `
})
export class BoundInputTextComponent extends Bound implements OnInit {
  ngOnInit(): void {
    console.log('form', this.form);
    console.log('field', this.field);
  }
}

@Component({
  selector: 'lib-field-input-text',
  templateUrl: './field-input-text.component.html',
  styleUrls: ['./field-input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldInputTextComponent),
      multi: true
    }
  ]
})
export class FieldInputTextComponent extends FieldBase {

  constructor() {
    super();
  }
}
