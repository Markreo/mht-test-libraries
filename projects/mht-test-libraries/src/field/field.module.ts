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
  FieldSelectObjectComponent
} from './components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FieldComponent} from './components/field/field.component';

const exs = [
  FieldComponent,
  FieldInputCurrencyComponent,
  FieldInputTextComponent,
  FieldInputNumberComponent,
  FieldInputPasswordComponent,
  FieldSelectEnumComponent,
  FieldSelectObjectComponent
];

const bounds = [BoundInputTextComponent, BoundInputPasswordComponent];

@NgModule({
  declarations: [...exs, ...bounds],
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    FormsModule
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
