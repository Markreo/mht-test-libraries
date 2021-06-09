import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {FieldService} from './services/field.service';
import {BuildEndpointFactory, BuildFakeEndpoint, FakeFormatDateFactory, FormatDateFactory} from './functions';
import {setFieldInjector} from './field-injector';
import {
  BoundInputPasswordComponent,
  BoundInputTextComponent,
  FieldInputCurrencyComponent,
  FieldInputNumberComponent,
  FieldInputPasswordComponent,
  FieldInputTextComponent,
  FieldSelectEnumComponent,
  FieldInputTextareaComponent,
  BoundInputTextareaComponent,
  BoundSelectDateComponent,
  FieldSelectDateComponent, BoundSelectObjectComponent
} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FieldComponent} from './components/field/field.component';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

const exs = [
  FieldComponent,
  FieldInputCurrencyComponent,
  FieldInputTextComponent,
  FieldInputNumberComponent,
  FieldInputPasswordComponent,
  FieldSelectEnumComponent,
  FieldInputTextareaComponent,
  FieldSelectDateComponent
];

const bounds = [
  BoundInputTextComponent,
  BoundInputPasswordComponent,
  BoundInputTextareaComponent,
  BoundSelectDateComponent,
  BoundSelectObjectComponent];

@NgModule({
  declarations: [...exs, ...bounds],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
    NzIconModule
  ],
  entryComponents: bounds,
  exports: [...exs]
})
export class FieldModule {
  // todo: loadConfig
  static forRoot(providers: { buildEndpointFactory: Provider, formatDateFactory: Provider }): ModuleWithProviders<FieldModule> {
    return {
      ngModule: FieldModule,
      providers: [
        FieldService,
        providers.buildEndpointFactory || {provide: BuildEndpointFactory, useClass: BuildFakeEndpoint},
        providers.formatDateFactory || {provide: FormatDateFactory, useClass: FakeFormatDateFactory},
      ]
    };
  }

  constructor(injector: Injector) {
    setFieldInjector(injector);
  }
}
