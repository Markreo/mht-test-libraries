import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {List<%= classify(name) %>Component} from './_components/list-<%= dasherize(name) %>/list-<%= dasherize(name) %>.component';
import {Detail<%= classify(name) %>Component} from './_components/detail-<%= dasherize(name) %>/detail-<%= dasherize(name) %>.component';
import {Form<%= classify(name) %>Component} from './_components/form-<%= dasherize(name) %>/form-<%= dasherize(name) %>.component';
import {<%= classify(name) %>RoutingModule} from './<%= dasherize(name) %>.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AntProviderModule} from '../ant-provider.module';
import {FieldModule} from 'mht-test-libraries';

@NgModule({
  declarations: [List<%= classify(name) %>Component, Detail<%= classify(name) %>Component, Form<%= classify(name) %>Component],
  imports: [
    CommonModule,
    <%= classify(name) %>RoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntProviderModule,
    FormsModule,
    FieldModule
  ]
})
export class <%= classify(name) %>Module {
}
