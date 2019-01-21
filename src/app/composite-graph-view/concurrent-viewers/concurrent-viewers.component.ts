import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Chart }  from 'chart.js';
import { DEFAULT_CONFIG } from '../../shared/const/graph/graph-default.configuration'
import { COLORS } from '../../shared/const/global/global.constants'
import { TimestampConversionService } from '../../shared/utils/conversions/timestamp-conversion.service';

@Component({
  selector: 'concurrent-viewers',
  templateUrl: './concurrent-viewers.component.html',
  styleUrls: ['./concurrent-viewers.component.scss'],
  providers: [TimestampConversionService]
})

export class ConcurrentViewersComponent {
  	@Input() viewersData: Array<any>;
  	@Input() viewersLabels: Array<any>;

  	public viewersChart: Chart;
  	private canvasElement: HTMLCanvasElement;

  	constructor(private timestampUtils: TimestampConversionService){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('concurrent-id');
    	this.canvasElement.height = 45;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();
		this.initializeGraph();
	}
    
    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    	this.initializeGraph();
	}

	private initializeGraph() {
	
		if (this.viewersChart) {
			this.viewersChart.destroy();
		}

		let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

		config.data = {
			labels: this.viewersLabels.map(value => {
				return this.timestampUtils.toShortDate(value);
			}),
			datasets: [{
				lineTension: 0,
				label: '',
				data: this.viewersData,
				fill: false,
				borderColor: '#E65F00',
				pointRadius: 0,
				pointHoverRadius: 0
			}]
		};

		config.options.scales.yAxes[0].ticks = {
			maxTicksLimit: 3,
			callback: function(value, index) {
			    if (value !== 0) return value;
			}
		 };
  		this.viewersChart = new Chart(this.canvasElement, config);
  	}
}