import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {FieldService} from './services/field.service';
import {BuildEndpointFactory, BuildFakeEndpoint, FakeFormatDateFactory, FormatDateFactory} from './functions';
import {setFieldInjector} from './field-injector';
import {
  BoundInputTextComponent,
  FieldComponent,
  FieldInputCurrencyComponent,
  FieldInputNumberComponent,
  FieldInputTextComponent,
  FieldSelectEnumComponent,
  FieldSelectObjectComponent
} from './components';
import {ReactiveFormsModule} from '@angular/forms';

const exs = [
  FieldComponent,
  FieldInputCurrencyComponent,
  FieldInputTextComponent,
  FieldInputNumberComponent,
  FieldSelectEnumComponent,
  FieldSelectObjectComponent
];

const bounds = [BoundInputTextComponent];

@NgModule({
  declarations: [...exs, ...bounds],
  imports: [
    ReactiveFormsModule
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

  static forChild(providers: { buildEndpointFactory: Provider, formatDateFactory: Provider }): ModuleWithProviders<FieldModule> {
    return {
      ngModule: FieldModule,
      providers: [
        FieldService,
        providers.buildEndpointFactory || {provide: BuildEndpointFactory, useValue: BuildFakeEndpoint},
        providers.formatDateFactory || {provide: FormatDateFactory, useValue: FakeFormatDateFactory},
      ]
    };
  }

  constructor(injector: Injector) {
    setFieldInjector(injector);
  }
}
