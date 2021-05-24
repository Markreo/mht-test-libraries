import {BaseField} from '../models/fields/base.field';
import {AbstractControl, ControlValueAccessor, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {Injectable, Input} from '@angular/core';
import {noop} from 'rxjs';

@Injectable()
export class FieldBase<T extends BaseField = BaseField> implements ControlValueAccessor, Validator {
  @Input() field: T;
  isDisabled = false;
  innerValue;

  get value(): any {
    return this.innerValue;
  }

  set value(value) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.triggerOnChange(this.innerValue);
    }
  }

  triggerOnTouched = noop;
  triggerOnChange: (_) => void = noop;
  triggerValidator = noop;

  validate(control: AbstractControl): ValidationErrors | null {
    const error = {};
    if (this.field && this.field.validators) {
      this.field.validators.forEach((validator: ValidatorFn) => {
        Object.assign(error, validator(control));
      });
    }
    return Object.keys(error).length ? error : null;
  }


  writeValue(obj: any): void {
    this.innerValue = obj; // without triggerOnChange => ng-pristine
  }

  registerOnChange(fn: any): void {
    this.triggerOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.triggerOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnValidatorChange(fn: any): void {
    this.triggerValidator = fn;
  }


}
