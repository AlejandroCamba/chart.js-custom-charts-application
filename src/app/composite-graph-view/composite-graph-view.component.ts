import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CapacityOffloadService } from '../shared/services/capacity-offload.service';
import { ConcurrentViewersService } from '../shared/services/concurrent-viewers.service';
import { CapacityOffload } from './capacity-offload/model/capacity-offload.model'
import { ConcurrentViewers } from './concurrent-viewers/model/concurrent-viewers.model'

@Component({
  selector: 'composite-graph-view',
  templateUrl: './composite-graph-view.component.html',
  styleUrls: ['./composite-graph-view.component.scss']
})

export class CompositeGraphViewComponent implements OnInit{
	private capacityOffloadData: CapacityOffload;
	private concurrentViewers: ConcurrentViewers;

	// capacity offload graph
	private p2pData: Array<number>;
	private cdnData: Array<number>;

	private p2pLabels: Array<number>;
	private cdnLabels: Array<number>;

	private maxCdn: number;
	private maxP2p: number;

	//concurrent viewers graph
	private viewersData: Array<number>;
	private viewersLabels: Array<number>

  	constructor(
  		private capacityOffloadService: CapacityOffloadService,
  		private concurrentViewersService: ConcurrentViewersService,
  		private cdr: ChangeDetectorRef ){}

  	ngOnInit() {
  		this.capacityOffloadService.getCapacityOffload().subscribe( res => {
  			this.capacityOffloadData = res;
  			
  			this.p2pData = Object.assign([], this.capacityOffloadData.getP2pData());
  			this.cdnData = Object.assign([], this.capacityOffloadData.getCdnData());
  			
  			this.p2pLabels = Object.assign([], this.capacityOffloadData.getP2pLabels());
  			this.cdnLabels = Object.assign([], this.capacityOffloadData.getCdnLabels());
  			
  		},error=> console.log("Error trying to get capacity offload data"));

  		this.capacityOffloadService.getMaximumValues().subscribe(res => {
  			this.maxP2p = res['p2p'];
  			this.maxCdn = res['cdn'];
  		}, error => console.log("Error trying to get maximum cdn & p2p value"))

  		this.concurrentViewersService.getCapacityOffload().subscribe(res => {
  			this.concurrentViewers = res;

  			this.viewersData = Object.assign([], this.concurrentViewers.getViewers());
  			this.viewersLabels = Object.assign([], this.concurrentViewers.getViewersLabels());
  		})
  	}

    ngOnDestroy() {
        this.cdr.detach();
    }

}
