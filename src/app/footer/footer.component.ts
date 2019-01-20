import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CapacityOffload } from '../composite-graph-view/capacity-offload/model/capacity-offload.model'
import { ConcurrentViewers } from '../composite-graph-view/concurrent-viewers/model/concurrent-viewers.model'
import { TimestampConversionService } from '../shared/utils/conversions/timestamp-conversion.service';
import { CapacityOffloadService } from '../shared/services/capacity-offload.service';
import { ConcurrentViewersService } from '../shared/services/concurrent-viewers.service';
import { DatePickCacheService } from '../shared/services/date-pick-cache.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [TimestampConversionService]
})

export class FooterComponent implements OnInit {
	private capacityOffloadData: CapacityOffload;
	private concurrentViewers: ConcurrentViewers;

	// capacity offload graph
  	@Input() p2pData: Array<any>;
  	@Input() p2pLabels: Array<any>;

  	@Input() cdnData: Array<any>;
  	@Input() cdnLabels: Array<any>;
  	
  	@Input() dateLabels:Array<string>;

  	@Input() maxP2p: number;
  	@Input() maxCdn: number;

  	@Output() p2pDataChange = new EventEmitter();
  	@Output() p2pLabelsChange = new EventEmitter();

  	@Output() cdnDataChange = new EventEmitter();
  	@Output() cdnLabelsChange = new EventEmitter();
  	
  	@Output() dateLabelsChange = new EventEmitter();

  	@Output() maxP2pChange = new EventEmitter();
  	@Output() maxCdnChange = new EventEmitter();

	//concurrent viewers graph
  	@Input() viewersData: Array<any>;
  	@Input() viewersLabels: Array<any>;  	

  	@Output() viewersDataChange = new EventEmitter();
  	@Output() viewersLabelsChange = new EventEmitter();

	private pairFormattedDates: Map<number, string> = new Map(); 

  	constructor(
  		private timestampConversion: TimestampConversionService,
  		private capacityOffloadService: CapacityOffloadService,
  		private concurrentViewersService: ConcurrentViewersService,
  		private dateCache: DatePickCacheService ){}

 	ngOnInit() {
 		let i = 0;
 		let cdnFormattedDates = this.formatDatesIntoDisplayable(this.cdnLabels);
 		
 		this.cdnLabels.map(value => {
			if (this.timestampConversion.toFulltDate(value) == cdnFormattedDates[i]) {
				if (i == (cdnFormattedDates.length - 1) ) {
					this.pairFormattedDates.set(this.cdnLabels[this.cdnLabels.length - 1], cdnFormattedDates[i]);
				} else {
					this.pairFormattedDates.set(value, cdnFormattedDates[i++]);
				}
			}			
 		})
 	}

 	formatDatesIntoDisplayable(array: Array<number>): Array<string> {
 		let seen = {};
 		return array.map(value => {
 			return this.timestampConversion.toFulltDate(value);
 		}).filter(function(item) {
		    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		}); 	
	}

	setInitialDate(timestamp) {
		this.dateCache.setFrom(timestamp);
  		this.capacityOffloadService.getCapacityOffload(timestamp, undefined).subscribe( res => {
  			this.capacityOffloadData = res;
  			
  			this.p2pData = Object.assign([], this.capacityOffloadData.getP2pData());
  			this.cdnData = Object.assign([], this.capacityOffloadData.getCdnData());
  			
  			this.p2pLabels = Object.assign([], this.capacityOffloadData.getP2pLabels());
  			this.cdnLabels = Object.assign([], this.capacityOffloadData.getCdnLabels());

  			this.p2pDataChange.emit(this.p2pData);
  			this.cdnDataChange.emit(this.cdnData);
  			this.p2pLabelsChange.emit(this.p2pLabels);
  			this.cdnLabelsChange.emit(this.cdnLabels);
  		},error=> console.log("Error trying to get capacity offload data update"));

  		this.capacityOffloadService.getMaximumValues(timestamp, undefined).subscribe(res => {
  			this.maxP2p = res['p2p'];
  			this.maxCdn = res['cdn'];

  			this.maxP2pChange.emit(this.maxP2p);
  			this.maxCdnChange.emit(this.maxCdn);
  		}, error => console.log("Error trying to get maximum cdn & p2p value"))

  		this.concurrentViewersService.getConcurrentViewers(timestamp, undefined).subscribe(res => {
  			this.concurrentViewers = res;

  			this.viewersData = Object.assign([], this.concurrentViewers.getViewers());
  			this.viewersLabels = Object.assign([], this.concurrentViewers.getViewersLabels());

  			this.viewersDataChange.emit(this.viewersData);
  			this.viewersLabelsChange.emit(this.viewersLabels);
  		})
	}

	setFinalDate(timestamp) {
		this.dateCache.setTo(timestamp)
  		this.capacityOffloadService.getCapacityOffload(undefined, timestamp).subscribe( res => {
  			this.capacityOffloadData = res;
  			
  			this.p2pData = Object.assign([], this.capacityOffloadData.getP2pData());
  			this.cdnData = Object.assign([], this.capacityOffloadData.getCdnData());
  			
  			this.p2pLabels = Object.assign([], this.capacityOffloadData.getP2pLabels());
  			this.cdnLabels = Object.assign([], this.capacityOffloadData.getCdnLabels());

  			this.p2pDataChange.emit(this.p2pData);
  			this.cdnDataChange.emit(this.cdnData);
  			this.p2pLabelsChange.emit(this.p2pLabels);
  			this.cdnLabelsChange.emit(this.cdnLabels);
  		},error=> console.log("Error trying to get capacity offload data update"));

  		this.capacityOffloadService.getMaximumValues(undefined, timestamp).subscribe(res => {
  			this.maxP2p = res['p2p'];
  			this.maxCdn = res['cdn'];

  			this.maxP2pChange.emit(this.maxP2p);
  			this.maxCdnChange.emit(this.maxCdn);
  		}, error => console.log("Error trying to get maximum cdn & p2p value"))

  		this.concurrentViewersService.getConcurrentViewers(undefined, timestamp).subscribe(res => {
  			this.concurrentViewers = res;

  			this.viewersData = Object.assign([], this.concurrentViewers.getViewers());
  			this.viewersLabels = Object.assign([], this.concurrentViewers.getViewersLabels());

  			this.viewersDataChange.emit(this.viewersData);
  			this.viewersLabelsChange.emit(this.viewersLabels);
  		})
	}
}