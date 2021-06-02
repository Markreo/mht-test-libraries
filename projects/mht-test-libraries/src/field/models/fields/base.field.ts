import {ValidatorFn, Validators} from '@angular/forms';

export class BaseField {

  key: string;
  label: string;
  disabled: boolean;

  // tslint:disable-next-line:variable-name
  private _validators: ValidatorFn[] = [];

  isRequired = false;

  constructor(options: Partial<BaseField>) {
    this.key = options.key;
    this.label = options.label;
    this.validators = options.validators;
    this.disabled = options.disabled || false;
  }

  get validators(): ValidatorFn[] {
    return this._validators;
  }

  set validators(value: ValidatorFn[]) {
    this._validators = value || [];
    this.isRequired = this._validators.includes(Validators.required);
  }

  renderValue(row): string {
    return row[this.key];
  }

}
