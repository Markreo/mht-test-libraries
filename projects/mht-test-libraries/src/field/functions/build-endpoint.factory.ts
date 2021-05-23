import {Injectable} from '@angular/core';

export abstract class BuildEndpointFactory {
  abstract buildUrl(endpoint: string): string;
}

@Injectable()
export class BuildFakeEndpoint extends BuildEndpointFactory {
  buildUrl(endpoint: string): string {
    return endpoint;
  }
}
