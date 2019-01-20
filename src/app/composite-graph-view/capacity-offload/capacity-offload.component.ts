import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart }  from 'chart.js';
import { CapacityOffload } from './model/capacity-offload.model'
import { ByteConversionService } from '../../shared/utils/conversions/byte-conversion.service';
import { TimestampConversionService } from '../../shared/utils/conversions/timestamp-conversion.service';
import { DEFAULT_CONFIG } from '../../shared/const/graph/graph-default.configuration'
import { COLORS } from '../../shared/const/global/global.constants'

import 'chartjs-plugin-annotation';

@Component({
  selector: 'capacity-offload',
  templateUrl: './capacity-offload.component.html',
  styleUrls: ['./capacity-offload.component.scss'],
  providers: [
  	ByteConversionService, 
  	TimestampConversionService
  ]
})

export class CapacityOffloadComponent {
  	@Input() p2pData: Array<any>;
  	@Input() p2pLabels: Array<any>;

  	@Input() cdnData: Array<any>;
  	@Input() cdnLabels: Array<any>;
  	
  	@Input() dateLabels:Array<string>;

  	@Input() maxP2p: number;
  	@Input() maxCdn: number;
  	
  	public bandiwthChart: Chart;
  	private canvasElement: HTMLCanvasElement;

  	constructor(
  		private bytesUtils: ByteConversionService,
  		private timestampUtils: TimestampConversionService){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('bandwith-id');
    	this.canvasElement.height = 57;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();  
		this.initializeGraph();		
	}

	private initializeGraph() {
	let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

	config.options.layout.padding.top = 15;

	config.data = {
		labels: this.cdnLabels.map(value => {
			let date = new Date(value)
			let monthName = [
				"Jan", "Feb", "Mar",
				"Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct",
				"Nov", "Dec"
			]

			return date.getDate() + ". " + monthName[date.getMonth()];
		}),
		datasets: [{
			lineTension: 0,
			label: '',
			data: this.bytesUtils.toGb(this.cdnData[0].data),
			fill: true,
			backgroundColor: COLORS.PINK,
			borderColor: COLORS.DARK_PINK,
			pointRadius: 0
		},{
			label: '',
			fill: true,
			backgroundColor: COLORS.LIGHT_BLUE,
			borderColor: COLORS.DARK_BLUE,
			pointRadius: 0,
			lineTension: 0,
			data: this.bytesUtils.toGb(this.p2pData[0].data),
		}]
	};

	config.options.annotation = {
		annotations: [{
				      drawTime: "afterDraw",
				      id: "hline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.bytesUtils.toGb(undefined, this.maxP2p),
				      borderDash: [4],
				      borderWidth: 2,
				      borderColor: COLORS.GREEN,
				      label: {
				        backgroundColor: "rgba(0,0,0,0)",
				        content: "Maximum throughput: " + this.bytesUtils.toGb(undefined, this.maxP2p) + " Gbps",
				        enabled: true,
				        position: "right",
				        fontFamily: 'Roboto',
				        fontColor: 'black',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 12 ,
				        fontStyle: 'normal',
				        yAdjust: -5,
				        xAdjust: 0,
				      }
				    },{
				      drawTime: "afterDraw",
				      id: "dline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.bytesUtils.toGb(undefined, this.maxCdn),
				      borderDash: [4],
				      borderWidth: 2,
				      borderColor: COLORS.BERRY,
				      label: {
				        backgroundColor: "rgba(0,0,0,0)",
				        content: "Maximum CDN contrinution: " + this.bytesUtils.toGb(undefined, this.maxCdn) + " Gbps",
				        enabled: true,
				        position: "left",
				        fontFamily: 'Roboto',
				        fontColor: 'black',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 12,
				        fontStyle: 'normal',
				        yAdjust: -5,
				        xAdjust: 0,
				      }
				    }]
	}	

	config.options.scales.xAxes[0].ticks = {
		maxTicksLimit: 15,
		maxRotation: 0,
		minRotation: 0
	}

	config.options.scales.yAxes[0].ticks = {
		maxTicksLimit: 3,
		callback: function(value, index) {
			if (value !== 0) return [value,'Gbps'];
		}		
	}

    this.bandiwthChart = new Chart(this.canvasElement, config);
  }
}
