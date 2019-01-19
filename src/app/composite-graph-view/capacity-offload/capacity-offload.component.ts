import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart }  from 'chart.js';
import { CapacityOffload } from './model/capacity-offload.model'
import 'chartjs-plugin-annotation';

@Component({
  selector: 'capacity-offload',
  templateUrl: './capacity-offload.component.html',
  styleUrls: ['./capacity-offload.component.scss']
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

  	constructor(){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('bandwith-id');
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
				labels: this.cdnLabels,
				datasets: [{
					lineTension: 0,
					label: '',
					data: this.cdnData[0].data,
					fill: true,
					pointRadius: 0
				}, {
					label: '',
					fill: true,
					pointRadius: 0,
					lineTension: 0,
					data: this.p2pData[0].data,
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
				annotation: {
				    annotations: [{
				      drawTime: "beforeDatasetsDraw",
				      id: "hline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.maxP2p,
				      borderDash: [4],
				      borderWidth: 2,
				      borderColor: 'rgba(69,135,65,0.9)',
				      label: {
				        backgroundColor: "rgba(0,0,0,0)",
				        content: "Maximum throughput: " + this.maxP2p,
				        enabled: true,
				        position: "right",
				        fontFamily: 'Roboto',
				        fontColor: 'black',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 10 ,
				        fontStyle: 'bold',
				        yAdjust: -10,
				        xAdjust: 0,
				      }
				    },{
				      drawTime: "beforeDatasetsDraw",
				      id: "dline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.maxCdn,
				      borderDash: [4],
				      borderWidth: 2,
				      borderColor: 'rgba(178,18,98,0.9)',
				      label: {
				        backgroundColor: "rgba(0,0,0,0)",
				        content: "Maximum CDN contrinution: " + this.maxCdn,
				        enabled: true,
				        position: "left",
				        fontFamily: 'Roboto',
				        fontColor: 'black',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 10 ,
				        fontStyle: 'bold',
				        yAdjust: -10,
				        xAdjust: 0,
				      }
				    }]
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
						display: true,
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
