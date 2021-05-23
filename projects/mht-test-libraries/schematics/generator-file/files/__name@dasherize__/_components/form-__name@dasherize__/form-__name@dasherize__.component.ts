import {Component} from '@angular/core';
import {<%= classify(name) %>Entity} from '../../_models/<%= dasherize(name) %>.entity';
import {FormHelper} from '../../../base/_helpers/form-helper';
import {ActivatedRoute} from '@angular/router';
import {<%= classify(name) %>Service} from '../../_services/<%= dasherize(name) %>.service';

@Component({
  selector: 'app-form-<%= dasherize(name) %>',
  templateUrl: './form-<%= dasherize(name) %>.component.html',
  styleUrls: ['./form-<%= dasherize(name) %>.component.css']
})
export class Form<%= classify(name) %>Component extends FormHelper<<%= classify(name) %>Entity> {
  fields = [];

  constructor(private activated: ActivatedRoute, private <%= camelize(name) %>Service: <%= classify(name) %>Service) {
    super(activated, <%= camelize(name) %>Service);
  }
}
