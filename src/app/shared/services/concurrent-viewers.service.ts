import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ConcurrentViewers } from '../../composite-graph-view/concurrent-viewers/model/concurrent-viewers.model';
import { DatePickCacheService } from '../services/date-pick-cache.service';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class ConcurrentViewersService {
  private concurrentViewers :ConcurrentViewers;
  private cachedFrom: number = undefined; 
  private cachedTo: number = undefined; 

  constructor(
    private apiService: ApiService,
    private dateCache: DatePickCacheService) { }

  getConcurrentViewers(from?: number, to?: number): Observable<ConcurrentViewers> {
      return this.apiService
        .post('audience', {
        	"session_token": localStorage.getItem("session_token"),
        	"from": this.dateCache.getFrom(),
        	"to": this.dateCache.getTo() }).map(response => {
        		this.concurrentViewers = new ConcurrentViewers(response["audience"]);
        		return this.concurrentViewers;
        })
  }
}