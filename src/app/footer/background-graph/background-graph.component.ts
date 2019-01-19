import { Component, OnInit, Input } from '@angular/core';
import { Chart }  from 'chart.js';

@Component({
  selector: 'background-graph',
  templateUrl: './background-graph.component.html',
  styleUrls: ['./background-graph.component.scss']
})

export class BackgroundGraphComponent {
  	@Input() backgroundData: Array<any>;
  	@Input() backgroundLabels: Array<any>;

  	public backgroundChart: Chart;
  	private canvasElement: HTMLCanvasElement;

  	constructor(){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('background-graph-id');
    	this.canvasElement.height = 20;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();  
		this.initializeGraph();		
	}

	private initializeGraph() {
    let config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					lineTension: 0,
					label: '',
					data: [1,2,3,4,5,6,7],
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
						display: false,
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

    this.backgroundChart = new Chart(this.canvasElement, config);
  }
}