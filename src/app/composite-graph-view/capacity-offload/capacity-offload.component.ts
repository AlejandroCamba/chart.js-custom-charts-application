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
  	}
	
	ngOnInit() {
		console.log("labelsss: " + this.cdnLabels);
		console.log("dataaaa: " + this.cdnData[0].data);
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
				leyend: {
					display: false
				},
				annotation: {
				    annotations: [{
				      drawTime: "beforeDatasetsDraw",
				      id: "hline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.maxP2p,
				      borderDash: [3],
				      borderWidth: 2,
				      borderColor: 'rgba(255,255,255,0.2)',
				      label: {
				        backgroundColor: "white",
				        content: 30,
				        enabled: true,
				        position: "left",
				        fontFamily: 'Roboto',
				        fontColor: '#273261',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 10 ,
				        fontStyle: 'bold',
				        yAdjust: 0,
				        xAdjust: 85,
				      }
				    },{
				      drawTime: "beforeDatasetsDraw",
				      id: "dline",
				      type: "line",
				      mode: "horizontal",
				      scaleID: "y-axis-0",
				      value: this.maxCdn,
				      borderDash: [3],
				      borderWidth: 2,
				      borderColor: 'rgba(255,255,255,0.2)',
				      label: {
				        backgroundColor: "white",
				        content: 50,
				        enabled: true,
				        position: "left",
				        fontFamily: 'Roboto',
				        fontColor: '#273261',
				        cornerRadius: 12,
				        xPadding: 12 ,
				        yPadding: 6 ,
				        fontSize: 10 ,
				        fontStyle: 'bold',
				        yAdjust: 0,
				        xAdjust: 85,
				      }
				    }]
				  },
				title: {
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

    this.bandiwthChart = new Chart(this.canvasElement, config);
  }
}
