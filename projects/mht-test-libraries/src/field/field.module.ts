import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {FieldComponent} from './components/field/field.component';
import {FieldInputCurrencyComponent} from './components/field-input-currency/field-input-currency.component';
import {FieldInputTextComponent} from './components/field-input-text/field-input-text.component';
import {FieldInputNumberComponent} from './components/field-input-number/field-input-number.component';
import {FieldSelectEnumComponent} from './components/field-select-enum/field-select-enum.component';
import {FieldSelectObjectComponent} from './components/field-select-object/field-select-object.component';
import {FieldService} from './services/field.service';
import {BuildEndpointFactory, BuildFakeEndpoint} from './functions/build-endpoint.factory';
import {setFieldInjector} from './field-injector';

const exs = [
  FieldComponent,
  FieldInputCurrencyComponent,
  FieldInputTextComponent,
  FieldInputNumberComponent,
  FieldSelectEnumComponent,
  FieldSelectObjectComponent
];

@NgModule({
  declarations: exs,
  imports: [],
  exports: [...exs]
})
export class FieldModule {
  static forRoot(providers): ModuleWithProviders<FieldModule> {
    return {
      ngModule: FieldModule,
      providers: [
        FieldService,
        providers.buildEnpointFactory || {provide: BuildEndpointFactory, useValue: BuildFakeEndpoint}]
    };
  }

  constructor(injector: Injector) {
    setFieldInjector(injector);
  }
}
