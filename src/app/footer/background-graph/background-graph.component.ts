import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChange} from '@angular/core';
import { Chart }  from 'chart.js';
import { DEFAULT_CONFIG } from '../../shared/const/graph/graph-default.configuration'

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

  	constructor(private cdr: ChangeDetectorRef){}

  	private setCanvasDimensions() {
    	this.canvasElement = <HTMLCanvasElement> document.getElementById('background-graph-id');
    	this.canvasElement.height = 20;
  	}
	
	ngOnInit() {
		this.setCanvasDimensions();  
		this.initializeGraph();		
	}

    ngOnDestroy() {
        this.cdr.detach();
    }

	ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    	this.initializeGraph();
	}

	private initializeGraph() {
		if (this.backgroundChart) {
		this.backgroundChart.destroy();
	}

Chart.plugins.register({

  beforeDraw: function(chartInstance) {
  	if(chartInstance.chart.canvas.id == "background-graph-id"){
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = "rgba(69,135,65,0.3)";
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
  	}
  }
});
	let config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

	config.data = {
			labels: this.backgroundLabels,
				datasets: [{
					lineTension: 0,
					label: '',
					data: this.backgroundData,
					fill: true,
					borderColor: 'rgba(69,135,65,0.0)',
					backgroundColor:'rgba(69,135,65,0.3)',
					pointRadius: 0
				}]			
	}

	config.options.scales.yAxes[0].display = false;

    this.backgroundChart = new Chart(this.canvasElement, config);
  }
}