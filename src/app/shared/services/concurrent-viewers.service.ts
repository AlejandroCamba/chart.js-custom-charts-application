import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ConcurrentViewers } from '../../composite-graph-view/concurrent-viewers/model/concurrent-viewers.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class ConcurrentViewersService {
  private concurrentViewers :ConcurrentViewers;

  constructor(private apiService: ApiService) { }

  getCapacityOffload(): Observable<ConcurrentViewers> {
      return this.apiService
        .post('audience', {
        	"session_token": localStorage.getItem("session_token"),
        	"from":1509548400000,
        	"to":1510844400000 }).map(response => {
        		this.concurrentViewers = new ConcurrentViewers(response["audience"]);
        		return this.concurrentViewers;
        })
  }
}