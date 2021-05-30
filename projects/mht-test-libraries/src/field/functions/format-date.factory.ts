import {Injectable} from '@angular/core';

@Injectable()
export abstract class FormatDateFactory {
  abstract formatDate(date: Date, format, locale?: string): string;
}

@Injectable()
export class FakeFormatDateFactory extends FormatDateFactory {
  formatDate(date: Date, format, locale?: string): string {
    return date.toISOString();
  }
}
