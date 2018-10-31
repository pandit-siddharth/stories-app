import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { appConstants } from './constant';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = appConstants.apiUrl;

@Injectable()
export class StoriesService {
  constructor(private http: HttpClient) { }

  getStories(): Observable<any[]> {
    return this.http
      .get(API_URL)
      .map(data => {
        return data['hits'] ? data['hits'] : [];
      })
      .catch(this.handleError);
  }

  getColumns(): string[] {
    return appConstants.columns;
  }

  handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
