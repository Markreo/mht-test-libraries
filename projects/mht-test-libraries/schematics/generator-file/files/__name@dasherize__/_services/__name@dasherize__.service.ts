import {Injectable} from '@angular/core';
import {BaseService} from '../../base/_services/base.service';
import {<%= classify(name) %>Entity} from '../_models/<%= dasherize(name) %>.entity';
import {ENDPOINT_<%= name.toUpperCase() %>, <%= name.toUpperCase() %>} from '../_constants/<%= dasherize(name) %>.const';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service extends BaseService<<%= classify(name) %>Entity> {
  endpoint = ENDPOINT_<%= name.toUpperCase() %>;
  module = <%= name.toUpperCase() %>;

  createInstance(entity: Partial<<%= classify(name) %>Entity>): <%= classify(name) %>Entity {
    return new <%= classify(name) %>Entity(entity);
  }

  constructor() {
    super();
  }
}
