import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ConcurrentViewers } from '../../composite-graph-view/concurrent-viewers/model/concurrent-viewers.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class ConcurrentViewersService {
  private concurrentViewers :ConcurrentViewers;
  private cachedFrom: number = undefined; 
  private cachedTo: number = undefined; 

  constructor(private apiService: ApiService) { }

  getConcurrentViewers(from?: number, to?: number): Observable<ConcurrentViewers> {
    if (this.cachedFrom) {
        if (from) {
          this.cachedFrom = from;
        }
    } else {
      this.cachedFrom = from;
    }    

    if (this.cachedTo) {
        if (to) {
          this.cachedTo = to;
        }
    } else {
      this.cachedTo = to;
    }

      return this.apiService
        .post('audience', {
        	"session_token": localStorage.getItem("session_token"),
        	"from": this.cachedFrom == undefined ? 1509548400000 : this.cachedFrom,
        	"to": this.cachedTo == undefined ? 1510844400000 : this.cachedTo }).map(response => {
        		this.concurrentViewers = new ConcurrentViewers(response["audience"]);
        		return this.concurrentViewers;
        })
  }
}