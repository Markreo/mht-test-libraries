import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {BuildEndpointFactory} from '../../functions';
import {SelectObjectField} from '../../models/fields';
import {CreateQueryParams, RequestQueryBuilder} from '@nestjsx/crud-request';
import {Bound} from '../bound';

@Component({
  selector: 'lib-bound-select-object',
  template: `
    <div [formGroup]="form" *ngIf="field">
      <nz-select class="mr-3"
                 [nzLoading]="isLoading"
                 [nzPlaceHolder]="field.label"
                 nzAllowClear
                 nzShowSearch
                 nzServerSearch
                 [formControlName]="field.key"
                 [compareWith]="compareIdFn"
                 (nzOnSearch)="onSearch($event)">
        <ng-container *ngFor="let o of optionList">
          <nz-option *ngIf="!isLoading" [nzValue]="o" [nzLabel]="o.name"></nz-option>
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
  optionList: { id: any, name: string }[] = [];
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

  getData(searchStr: string): Observable<{ id: any, name: string }[]> {
    const options: CreateQueryParams = {fields: ['id', 'name'], search: {name: {$contL: searchStr}}};
    const queryString = RequestQueryBuilder.create(options).query();
    return this.http.get<{ count: number, data: any[], page: number, total: number }>(this.buildEndpointFactory.buildUrl((this.field as SelectObjectField).endpoint) + '?' + queryString)
      .pipe(
        map((resp) => {
          if (resp.data) {
            return resp.data;
          }
          return [];
        })
      );
  }

  compareIdFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

}
