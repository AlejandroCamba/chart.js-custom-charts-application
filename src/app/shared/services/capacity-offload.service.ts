import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CapacityOffload } from '../../composite-graph-view/capacity-offload/model/capacity-offload.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class CapacityOffloadService {
  private capacityOffload :CapacityOffload;
  private cachedFrom: number = undefined; 
  private cachedTo: number = undefined; 

  constructor(private apiService: ApiService) { }

  getCapacityOffload(from?: number, to?: number): Observable<CapacityOffload> {
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
        .post('bandwidth', { 
        	"session_token": localStorage.getItem("session_token"),
        	"from": this.cachedFrom == undefined ? 1509548400000 : this.cachedFrom,
        	"to": this.cachedTo == undefined ? 1510844400000 : this.cachedTo }).map(response => {
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
        	"from": this.cachedFrom == undefined ? 1509548400000 : this.cachedFrom,
        	"to": this.cachedTo == undefined ? 1510844400000 : this.cachedTo,
        	"aggregate": "max" }).map(response => {
           console.log("POST /bandwith max values successful");
        		return response
        })
  	}  
}