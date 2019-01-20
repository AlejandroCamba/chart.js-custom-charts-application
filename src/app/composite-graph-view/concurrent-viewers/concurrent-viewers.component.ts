import { Component, OnInit, Input } from '@angular/core';
import { Chart }  from 'chart.js';

@Component({
  selector: 'concurrent-viewers',
  templateUrl: './concurrent-viewers.component.html',
  styleUrls: ['./concurrent-viewers.component.scss']
})

export class ConcurrentViewersComponent {
  	@Input() viewersData: Array<any>;
  	@Input() viewersLabels: Array<any>;

  	public viewersChart: Chart;
  	private canvasElement: HTMLCanvasElement;

  	constructor(){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('concurrent-id');
    	this.canvasElement.height = 45;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();  
		this.initializeGraph();		
	}

	private initializeGraph() {
    let config = {
			type: 'line',
			data: {
				labels: this.viewersLabels,
				datasets: [{
					lineTension: 0,
					label: '',
					data: this.viewersData[0].data,
					fill: false,
					borderColor: '#E65F00',
					pointRadius: 0
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				legend: {
				    display: false,
				    labels: {
				      	boxWidth: 0
				    }
				},
				tooltips: {
					enabled: false
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: false,
						gridLines: {
	                		color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							display: false,
						}
					}],
					yAxes: [{
						display: true,
						gridLines: {
	                		color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							display: false,
						},
						ticks: {
							maxTicksLimit: 3,			
							callback: function(value, index) {
			                	if (value !== 0) return value;
			               	}
						}
					}]
				}
			}
		};

    this.viewersChart = new Chart(this.canvasElement, config);
  }
}