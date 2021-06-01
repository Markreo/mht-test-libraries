import {Component, Input, OnInit} from '@angular/core';
import {BaseField} from '../../models/fields';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'lib-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class FieldComponent implements OnInit {
  @Input() field: BaseField;

  constructor() {
  }

  ngOnInit(): void {
  }

}
