import React, {PropTypes, Component} from 'react';
import * as Colors from 'material-ui/styles/colors';
//import ChartistGraph from 'react-chartist';

const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
const SolidGauge = require('highcharts/modules/solid-gauge')

HighchartsMore(ReactHighcharts.Highcharts)
SolidGauge(ReactHighcharts.Highcharts)
//require('highcharts-more')(ReactHighcharts.Highcharts)
// import 'highcharts-release/highcharts-more.src.js';
// var SolidGauge = require('highcharts-solid-gauge');
// SolidGauge(ReactHighcharts.Highcharts);

export class ChartGuage extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount() {
			// let {value} = this.props;
			// let chart = this.refs.chart.getChart(value);
			// let point = chart.series[0].points[0];
			// console.log(point);
			// point.update(value);
			
	}

	render() { 
		let {value, center} = this.props;
		let options = {
			chart: {
				type: 'gauge',
				plotBackgroundColor: null,
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
				},
				// // center: ['50%', '85%'],
		  // //       size: '140%',
		  //       spacingTop: 0,
		  //       spacingLeft: 0,
		  //       spacingRight: 0,
		  //       spacingBottom: -200,
				title: {
					text: '',
				    style: {
						display: 'none'
					}
				},
				subtitle:{
					text: '',
					style: {
						display: 'none'
					}
				},
				pane: {
					center: center,
        			size: '100%',
					startAngle: -90,
					endAngle: 90,
					background: null,
				},
				// the value axis
				yAxis: {
					labels: {
							enabled: true,
							distance: 20
					},
					tickPosition: 'outside',
					tickPositions: [-1, 0, 1],
					minorTickLength: 0,
					min: -1,
					max: 1,
					plotBands: [{
						from:-1,
						to: 0,
						color: Colors.red500, 
						thickness: '40%'
					},{
						from: -.34,
						to: .34,
						color: Colors.yellow500, 
						thickness: '40%'
					},{
						from: .34,
						to: 1,
						color: Colors.blue500,
						thickness: '40%'
					}],

				},
				series: [{
						name: 'Emotion',
						data: [value]
				}],
				credits: {
					enabled: false
			}
		};















		return <ReactHighcharts config={options} ref="chart"></ReactHighcharts>;
	}


}

// export class ChartGuage extends Component{

// 	componentDidMount(){
//     this.updateChart();
//   }

//   updateChart() {

//   	var data = {
// 		  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
// 		  series: [
// 		    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
// 		    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
// 		  ]
// 		};

//     return new Chartist.Bar('.chart', data);
//   }

//   render() {
//     return (
//       <div className="chart"></div>
//     );
//   }

// }


const styles = {
		chartWrapper:{
		top: 0,
		left: 350,
		lineHeight: '24px',
		width:200,
		height:200
	}
};
