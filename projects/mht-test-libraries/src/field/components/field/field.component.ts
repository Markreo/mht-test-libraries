import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Bound} from '../bound';
import {BoundInputPasswordComponent, BoundInputTextareaComponent, BoundInputTextComponent, BoundSelectDateComponent} from '..';
import {BaseField, InputPasswordField, InputTextareaField, InputTextField, SelectDateField} from '../../models/fields';

@Component({
  selector: 'lib-field',
  template: '',
})
export class FieldComponent implements OnInit {
  @Input() field: BaseField;
  @Input() form: FormGroup;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }

    const component: Type<Bound> = this.switchComponent(this.field);
    if (component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.viewContainerRef.createComponent<Bound>(componentFactory);
      componentRef.instance.field = this.field;
      componentRef.instance.form = this.form;
    } else {
      console.log('component not found', this.field);
    }
  }

  switchComponent(field): Type<Bound> {
    switch (true) {
      case field instanceof InputPasswordField:
        return BoundInputPasswordComponent;
      case field instanceof InputTextareaField:
        return BoundInputTextareaComponent;
      case field instanceof InputTextField:
        return BoundInputTextComponent;
      case field instanceof SelectDateField:
        return BoundSelectDateComponent;
      default:
        return BoundInputTextComponent;
    }
  }
}
