import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CapacityOffload } from '../../composite-graph-view/capacity-offload/model/capacity-offload.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';
import { DatePickCacheService } from '../services/date-pick-cache.service';

@Injectable()
export class CapacityOffloadService {
  private capacityOffload :CapacityOffload;
  private cachedFrom: number = undefined; 
  private cachedTo: number = undefined; 

  constructor(
    private apiService: ApiService,
    private dateCache: DatePickCacheService) { }

  getCapacityOffload(from?: number, to?: number): Observable<CapacityOffload> {
      return this.apiService
        .post('bandwidth', { 
        	"session_token": localStorage.getItem("session_token"),
        	"from": this.dateCache.getFrom(),
        	"to": this.dateCache.getTo() }).map(response => {
	            this.capacityOffload = new CapacityOffload(
	            		response['cdn'],
	            		response['p2p']
	            	);
              console.log("POST /bandwith successful");
            return this.capacityOffload;
        })
  }

  getMaximumValues(from?: number, to?: number): Observable<any> {
    return this.apiService
        .post('bandwidth', { 
        	"session_token": localStorage.getItem("session_token"),
        	"from": this.dateCache.getFrom(),
        	"to": this.dateCache.getTo(),
        	"aggregate": "max" }).map(response => {
           console.log("POST /bandwith max values successful");
        		return response
        })
  	}  
}