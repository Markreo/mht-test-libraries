import {SelectObjectField} from 'mht-test-libraries';
import {Validators} from '@angular/forms';
import {ENDPOINT_<%= name.replace('-', '_').toUpperCase() %>, LABEL_<%= name.replace('-', '_').toUpperCase() %>} from '../_constants/<%= dasherize(name) %>.const';

export class Select<%= classify(name) %>Field extends SelectObjectField {
  constructor(options: Partial<Select<%= classify(name) %>Field> = {}) {
    const init = {
      key: '<%= underscore(name) %>',
      label: LABEL_<%= name.replace('-', '_').toUpperCase() %>,
      endpoint: ENDPOINT_<%= name.replace('-', '_').toUpperCase() %>
    };
    super(Object.assign(init, options));
  }
}



