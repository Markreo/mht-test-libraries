import {SelectObjectField} from 'mht-test-libraries';
import {Validators} from '@angular/forms';
import {ENDPOINT_<%= name.toUpperCase() %>, LABEL_<%= name.toUpperCase() %>} from '../_constants/<%= dasherize(name) %>.const';

export class Select<%= classify(name) %>Field extends SelectObjectField {
  constructor(options: Partial<Select<%= classify(name) %>Field> = {}) {
    const init = {
      key: '<%= underscore(name) %>',
      label: LABEL_<%= name.toUpperCase() %>,
      validators: [Validators.required],
      endpoint: ENDPOINT_<%= name.toUpperCase() %>
    };
    super(Object.assign(init, options));
  }
}



