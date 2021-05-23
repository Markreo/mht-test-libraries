import {Component} from '@angular/core';
import {ShowTableHelper} from '../../../base/_helpers/show-table-helper';
import {<%= classify(name) %>Entity} from '../../_models/<%= dasherize(name) %>.entity';
import {<%= classify(name) %>Service} from '../../_services/<%= dasherize(name) %>.service';
import {COLUMNS_<%= name.toUpperCase() %>, LABEL_<%= name.toUpperCase() %>} from '../../_constants/<%= dasherize(name) %>.const';
import {fieldToColumn} from 'mht-test-libraries';

@Component({
  selector: 'app-list-<%= dasherize(name) %>',
  templateUrl: './list-<%= dasherize(name) %>.component.html',
  styleUrls: ['./list-<%= dasherize(name) %>.component.css']
})
export class List<%= classify(name) %>Component extends ShowTableHelper<<%= classify(name) %>Entity> {
  columns = fieldToColumn(COLUMNS_<%= name.toUpperCase() %>);
  title = LABEL_<%= name.toUpperCase() %>;

  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {
    super(<%= camelize(name) %>Service);
  }

}
