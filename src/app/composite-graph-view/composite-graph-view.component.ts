import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CapacityOffloadService } from '../shared/services/capacity-offload.service';
import { CapacityOffload } from './capacity-offload/model/capacity-offload.model'

@Component({
  selector: 'composite-graph-view',
  templateUrl: './composite-graph-view.component.html',
  styleUrls: ['./composite-graph-view.component.scss']
})

export class CompositeGraphViewComponent implements OnInit{
	private capacityOffloadData: CapacityOffload;
	private p2pData: Array<any>;
	private cdnData: Array<any>;
	private p2pLabels: Array<any>;
	private cdnLabels: Array<any>;

	private maxCdn: number;
	private maxP2p: number;

	private labels: Array<any>;

  	constructor(
  		private capacityOffloadService: CapacityOffloadService,
  		private cdr: ChangeDetectorRef ){}

  	ngOnInit() {
  		this.capacityOffloadService.getCapacityOffload().subscribe( res => {
  			this.capacityOffloadData = res;
  			
  			this.p2pData = Object.assign([], this.capacityOffloadData.getP2pData());
  			this.cdnData = Object.assign([], this.capacityOffloadData.getCdnData());
  			
  			this.p2pLabels = Object.assign([], this.capacityOffloadData.getP2pLabels());
  			this.cdnLabels = Object.assign([], this.capacityOffloadData.getCdnData());
  			
  		},error=> console.log("Error trying to get capacity offload data"));

  		this.capacityOffloadService.getMaximumValues().subscribe(res => {
  			this.maxP2p = res['p2p'];
  			this.maxCdn = res['cdn'];
  		}, error => console.log("Error trying to get maximum cdn & p2p value"))
  	}

    ngOnDestroy() {
        this.cdr.detach();
    }

}
