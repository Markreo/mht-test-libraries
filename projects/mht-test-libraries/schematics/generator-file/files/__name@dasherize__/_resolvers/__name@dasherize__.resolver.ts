import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {<%= classify(name) %>Entity} from '../_models/<%= dasherize(name) %>.entity';
import {<%= classify(name) %>Service} from '../_services/<%= dasherize(name) %>.service';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class <%= classify(name) %>Resolver implements Resolve<<%= classify(name) %>Entity> {
  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<<%= classify(name) %>Entity> {
    const id = route.paramMap.get('id');
    if (id === 'create') {
      return of(new <%= classify(name) %>Entity());
    } else {
      return this.<%= camelize(name) %>Service.get(id);
    }
  }
}
