import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CapacityOffload } from '../../composite-graph-view/capacity-offload/model/capacity-offload.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class CapacityOffloadService {
  private capacityOffload :CapacityOffload;

  constructor(private apiService: ApiService) { }

  getCapacityOffload(from?: number, to?: number): Observable<CapacityOffload> {
      return this.apiService
        .post('bandwidth', { 
        	"session_token": localStorage.getItem("session_token"),
        	"from": from == undefined ? 1509548400000 : from,
        	"to": to == undefined ? 1510844400000 : to }).map(response => {
        		console.log(response);
	            this.capacityOffload = new CapacityOffload(
	            		response['cdn'],
	            		response['p2p']
	            	);
            return this.capacityOffload;
        })
  }

  getMaximumValues(from?: number, to?: number): Observable<any> {
    return this.apiService
        .post('bandwidth', { 
        	"session_token": localStorage.getItem("session_token"),
        	"from": from == undefined ? 1509548400000 : from,
        	"to": to == undefined ? 1510844400000 : to,
        	"aggregate": "max" }).map(response => {
        		return response
        })
  	}  
}