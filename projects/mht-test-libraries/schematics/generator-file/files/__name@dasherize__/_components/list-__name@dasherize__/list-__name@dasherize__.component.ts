import {Component} from '@angular/core';
import {ShowTableHelper} from '../../../base/_helpers/show-table-helper';
import {<%= classify(name) %>Entity} from '../../_models/<%= dasherize(name) %>.entity';
import {<%= classify(name) %>Service} from '../../_services/<%= dasherize(name) %>.service';
import {COLUMNS_<%= name.replace('-', '_').toUpperCase() %>, LABEL_<%= name.replace('-', '_').toUpperCase() %>} from '../../_constants/<%= dasherize(name) %>.const';
import {fieldToColumns} from 'mht-test-libraries';

@Component({
  selector: 'app-list-<%= dasherize(name) %>',
  templateUrl: './list-<%= dasherize(name) %>.component.html',
  styleUrls: ['./list-<%= dasherize(name) %>.component.css']
})
export class List<%= classify(name) %>Component extends ShowTableHelper<<%= classify(name) %>Entity> {
  columns = fieldToColumns(COLUMNS_<%= name.replace('-', '_').toUpperCase() %>);
  title = LABEL_<%= name.replace('-', '_').toUpperCase() %>;

  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {
    super(<%= camelize(name) %>Service);
  }

}
