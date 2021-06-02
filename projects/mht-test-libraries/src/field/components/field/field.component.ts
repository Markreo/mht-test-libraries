import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Bound} from '../bound';
import {BoundInputPasswordComponent, BoundInputTextComponent} from '..';
import {BaseField, InputPasswordField, InputTextField} from '../../models/fields';

@Component({
  selector: 'lib-field',
  template: `
    <lib-bound-input-text [form]="form" [field]="field"></lib-bound-input-text>
  `,
})
export class FieldComponent implements OnInit {
  @Input() field: BaseField;
  @Input() form: FormGroup;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    // this.loadComponent();
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
    }
  }

  switchComponent(field): Type<Bound> {
    switch (true) {
      case field instanceof InputPasswordField:
        return BoundInputPasswordComponent;
      case field instanceof InputTextField:
        return BoundInputTextComponent;
      default:
        return BoundInputTextComponent;
    }
  }
}
