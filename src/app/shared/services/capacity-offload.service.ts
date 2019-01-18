import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { CapacityOffload } from '../../composite-graph-view/capacity-offload/model/capacity-offload.model';

import 'rxjs/add/operator/map';
import { ApiService } from './api.service';

@Injectable()
export class CapacityOffloadService {
  private capacityOffload :CapacityOffload;

  constructor(private apiService: ApiService) { }

  getCapacityOffload(): Observable<CapacityOffload> {
      return this.apiService
        .post('/bandwidth', { "session_token": localStorage.getItem["session_token"] }).map(response => {
            this.capacityOffload = new CapacityOffload();
            return this.capacityOffload;
        })
  }
}