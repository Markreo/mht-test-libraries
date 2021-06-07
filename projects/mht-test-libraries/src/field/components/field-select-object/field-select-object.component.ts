import {Component, forwardRef, OnInit} from '@angular/core';
import {FieldBase} from '../field-base';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {BuildEndpointFactory} from '../../functions';
import {SelectObjectField} from '../../models/fields';
import {RequestQueryBuilder} from '@nestjsx/crud-request';
import {Bound} from '../bound';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lib-bound-select-object',
  template: `
    <div [formGroup]="form" *ngIf="field">
      <nz-select class="mr-3"
                 [nzPlaceHolder]="field.label"
                 nzAllowClear
                 nzShowSearch
                 nzServerSearch
                 [formControlName]="field.key"
                 (nzOnSearch)="onSearch($event)">
        <ng-container *ngFor="let o of optionList">
          <nz-option *ngIf="!isLoading" [nzValue]="o.value" [nzLabel]="o.label"></nz-option>
        </ng-container>
        <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
          <i nz-icon nzType="loading" class="loading-icon"></i> Loading Data...
        </nz-option>
      </nz-select>
    </div>
  `
})
export class BoundSelectObjectComponent extends Bound implements OnInit {
  searchChange$ = new BehaviorSubject('');
  optionList: { value: any, label: string }[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private buildEndpointFactory: BuildEndpointFactory) {
    super();
  }

  ngOnInit(): void {
    this.subscribeData();
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
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
    return this.http.get(this.buildEndpointFactory.buildUrl((this.field as SelectObjectField).endpoint) + '?' + queryString)
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
