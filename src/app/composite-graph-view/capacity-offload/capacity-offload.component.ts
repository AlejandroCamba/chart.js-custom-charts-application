import { Component, Input, AfterViewInit, SimpleChange } from '@angular/core';
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
  		private timestampUtils: TimestampConversionService){
  		this.extendLine();
  	}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('bandwith-id');
    	this.canvasElement.height = 57;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();  
		this.initializeGraph();		
	}

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    	this.initializeGraph();
	}


	private extendLine() {
		Chart.defaults.LineWithLine = Chart.defaults.line;
		Chart.controllers.LineWithLine = Chart.controllers.line.extend({
		   draw: function(ease) {
		      	Chart.controllers.line.prototype.draw.call(this, ease);

		      	if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
		        	var activePoint = this.chart.tooltip._active[0],
		        	ctx = this.chart.ctx,
		            x = activePoint.tooltipPosition().x,
		            topY = this.chart.scales['y-axis-0'].top,
		            bottomY = this.chart.scales['y-axis-0'].bottom;

		        	// draw line
		         	ctx.save();
		         	ctx.beginPath();
		         	ctx.moveTo(x, topY);
		         	ctx.lineTo(x, bottomY + 10);
		         	ctx.lineWidth = 1;
		         	ctx.strokeStyle = 'rgba(0,0,0,0.1)';
		         	ctx.stroke();
		         	ctx.restore();
		      	}
		   	}
		});
	}

	private initializeGraph() {

		if (this.bandiwthChart) {
			this.bandiwthChart.destroy();
		}

		let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
		config.options.layout.padding.top = 15;
		config.type = "LineWithLine";
		config.rawLabels = JSON.parse(JSON.stringify(this.cdnLabels));
		config.functions[0] = this.timestampUtils.toFullDateAndTime;//create enum later for function indexes

		config.data = {
			labels: this.cdnLabels.map(value => {
				return this.timestampUtils.toShortDate(value);
			}),
			datasets: [{
				lineTension: 0,
				label: '',
				data: this.bytesUtils.toGb(this.cdnData),
				fill: true,
				backgroundColor: COLORS.PINK,
				borderColor: COLORS.DARK_PINK,
				pointBorderwidth: 1,
				pointBorderColor: "white",
				pointRadius: 0,
				pointHoverRadius: 3,
				pointHoverBackgroundColor: COLORS.PINK,
				pointHoverBorderWidth: 1,
				pointHoverBorderColor: 'white',
				pointStyle: "rect",
				pointRotation: 45
			},{
				label: '',
				fill: true,
				backgroundColor: COLORS.LIGHT_BLUE,
				borderColor: COLORS.DARK_BLUE,
				pointRadius: 0,
				lineTension: 0,
				data: this.bytesUtils.toGb(this.p2pData),
	        	pointHitRadius: 4,
				pointBorderwidth: 1,
				pointBorderColor: "white",
				pointHoverRadius: 3,
				pointHoverBackgroundColor: COLORS.DARK_BLUE,
				pointHoverBorderWidth: 1,
				pointHoverBorderColor: 'white',
				pointStyle: "circle",
				pointRotation: 45
			}]
		};

		config.options.annotation = {
			annotations: [{
				drawTime: "afterDatasetsDraw",
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
				drawTime: "afterDatasetsDraw",
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
				    content: "Maximum CDN contribution: " + this.bytesUtils.toGb(undefined, this.maxCdn) + " Gbps",
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

		config.options.scales.xAxes[0].display = true;

		config.options.scales.xAxes[0].ticks = {
			maxTicksLimit: 15,
			maxRotation: 0,
			minRotation: 0
		};

		config.options.hover = {
			mode: "index",
			intersect: false
		};

		config.options.tooltips = {
			enabled: false,
			custom: function(tooltipModel) {
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');

                console.log(tooltipModel);

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = "0";
                    return;
                }

                tooltipModel.caretX = tooltipModel.caretX + 70;

                // Set caret Position
                tooltipModel.xAlign = "right";
                tooltipEl.classList.remove('center', 'above', 'no-transform');
                if (tooltipModel.xAlign) {
                    tooltipEl.classList.add(tooltipModel.xAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }
                
                let p2pValue = config.data.datasets[1].data[tooltipModel.dataPoints[0].index]
                let httpValue = config.data.datasets[0].data[tooltipModel.dataPoints[0].index]
                let totalValue = (p2pValue + httpValue);

                //write content of tooltip elements
                document.getElementById("title").innerHTML = config.functions[0](config.rawLabels[tooltipModel.dataPoints[0].index]);
                document.getElementById("p2p-value").innerHTML = p2pValue.toFixed(2);
                document.getElementById("http-value").innerHTML = httpValue.toFixed(2);
                document.getElementById("total-value").innerHTML = totalValue.toFixed(2);
                document.getElementById("spike-red").innerHTML="NaN";

                var position = this._chart.canvas.getBoundingClientRect();

                tooltipEl.style.opacity = "1";
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
            }
		}

		config.options.scales.yAxes[0].ticks = {
			maxTicksLimit: 3,
			callback: function(value, index) {
				if (value !== 0) return [value,'Gbps'];
			}		
		}

		console.log(config.data);
    	this.bandiwthChart = new Chart(this.canvasElement, config);
  	}
}
