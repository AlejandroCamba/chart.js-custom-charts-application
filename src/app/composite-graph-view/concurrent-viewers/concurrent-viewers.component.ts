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

  	public bandiwthChart: Chart;
  	private canvasElement: HTMLCanvasElement;

  	constructor(){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('concurrent-id');
    	this.canvasElement.height = 65;
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
					fill: true,
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
						display: true,
						gridLines: {
	                		color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							display: false,
						}
					}],
					yAxes: [{
						display: false,
						gridLines: {
	                		color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							display: false,
						}
					}]
				}
			}
		};

    this.bandiwthChart = new Chart(this.canvasElement, config);
  }
}