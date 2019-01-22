export var DEFAULT_CONFIG = {
	data: {},
	rawLabels: {},
	functions: [],
	type: 'line',
	options: {
		responsive: true,
		maintainAspectRatio: true,
		layout: {
		    padding: {
		        left: 0,
		        right: 0,
		        top: 0,
		        bottom: 0
		    }
        },
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
		annotation: {},
		scales: {
			xAxes: [{
				display: false,
				gridLines: {
	                color: "rgba(0, 0, 0, 0)",
				},
				scaleLabel: {
					display: false,
				},
				ticks: {}
			}],
			yAxes: [{
				display: true,
				gridLines: {
	                color: "rgba(0, 0, 0, 0)",
				},
				scaleLabel: {
					display: false,
				},
				ticks: {}
			}]
		}
	}
}