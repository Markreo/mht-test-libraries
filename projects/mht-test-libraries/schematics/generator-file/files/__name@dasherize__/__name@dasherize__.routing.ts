import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {List<%= classify(name) %>Component} from './_components/list-<%= dasherize(name) %>/list-<%= dasherize(name) %>.component';
import {Form<%= classify(name) %>Component} from './_components/form-<%= dasherize(name) %>/form-<%= dasherize(name) %>.component';
import {Detail<%= classify(name) %>Component} from './_components/detail-<%= dasherize(name) %>/detail-<%= dasherize(name) %>.component';
import {<%= classify(name) %>Resolver} from './_resolvers/<%= dasherize(name) %>.resolver';

const routes: Routes = [
  {path: '', component: List<%= classify(name) %>Component},
  {
    path: 'form/:id',
    component: Form<%= classify(name) %>Component,
    resolve: {
      object: <%= classify(name) %>Resolver
    }
  },
  {
    path: 'detail/:id',
    component: Detail<%= classify(name) %>Component,
    resolve: {
      object: <%= classify(name) %>Resolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule {
}
