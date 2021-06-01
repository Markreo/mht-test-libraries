import {Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef} from '@angular/core';
import {BaseField} from '../../models/fields';
import {BoundInputTextComponent} from '..';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() field: BaseField;
  @Input() form: FormGroup;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BoundInputTextComponent);
    // viewContainerRef.clear();
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent<BoundInputTextComponent>(componentFactory);
    componentRef.instance.field = this.field;
    componentRef.instance.form = this.form;
  }
}
