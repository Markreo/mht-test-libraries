import {Component, OnInit} from '@angular/core';
import {Bound} from '../bound';
import {FieldBase} from '../field-base';

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
  templateUrl: './field-input-password.component.html',
  styleUrls: ['./field-input-password.component.css']
})
export class FieldInputPasswordComponent extends FieldBase {
  constructor() {
    super();
  }
}
