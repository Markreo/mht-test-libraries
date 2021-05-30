import {Component, OnInit} from '@angular/core';
import {FieldBase} from '../field-base';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {BuildEndpointFactory} from '../../functions';
import {SelectObjectField} from '../../models/fields/select-object.field';
import {RequestQueryBuilder} from '@nestjsx/crud-request';

@Component({
  selector: 'lib-field-select-object',
  templateUrl: './field-select-object.component.html',
  styleUrls: ['./field-select-object.component.css']
})
export class FieldSelectObjectComponent extends FieldBase<SelectObjectField> implements OnInit {
  searchChange$ = new BehaviorSubject('');
  optionList: { value: any, label: string }[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private buildEndpointFactory: BuildEndpointFactory) {
    super();
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  ngOnInit(): void {
    this.subscribeData();
  }

  subscribeData(): void {
    this.searchChange$.pipe(
      debounceTime(500),
      switchMap(search => this.getData(search))
    ).subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  getData(searchStr: string): Observable<{ value: any, label: string }[]> {
    const options = {search: {name: {$contL: searchStr}}};
    const queryString = RequestQueryBuilder.create(options).query();
    return this.http.get(this.buildEndpointFactory.buildUrl(this.field.endpoint) + '?' + queryString)
      .pipe(
        map((resp: any) => {
          if (resp.data) {
            return resp.data.map((item: any) => {
              return {
                value: item,
                label: item.name
              };
            });
          }
        })
      );
  }
}

