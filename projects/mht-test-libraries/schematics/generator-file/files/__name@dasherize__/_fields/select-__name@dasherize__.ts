import {SelectObject} from '../../field/components/select-object';
import {Validators} from '@angular/forms';
import {ENDPOINT_<%= name.toUpperCase() %>, LABEL_<%= name.toUpperCase() %>} from '../_constants/<%= dasherize(name) %>.const';

export class Select<%= classify(name) %> extends SelectObject {
  constructor(options: Partial<Select<%= classify(name) %>> = {}) {
    const init = {
      key: '<%= underscore(name) %>',
      label: LABEL_<%= name.toUpperCase() %>,
      validators: [Validators.required],
      endpoint: ENDPOINT_<%= name.toUpperCase() %>
    };
    super(Object.assign(init, options));
  }
}



