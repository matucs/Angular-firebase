import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

declare var _: any;
@Component({
  selector: 'app-mainchart',
  templateUrl: './mainChart.component.html',
  styleUrls: ['./mainChart.component.css']
})

export class MainChartComponent implements OnInit {
  constructor() { }
  ngOnInit() {

    let chart = new Chart('canvas', {
// The type of chart we want to create
type: 'bar',

// The data for our dataset
data: {
    labels: ['Uk', 'Us', 'Germany', 'Canada', 'Singapour'],
    datasets: [{
      barPercentage: 0.5,
        label: 'Male',
        backgroundColor: 'rgb(234, 24, 123)',
        borderColor: 'rgb(255, 0, 132)',
        data: [70000,60000, 40000, 50000, 20000,0]
    },
    {
      barPercentage: 0.5,
        label: 'Female',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 0, 132)',
        data: [40000,30000, 20000, 10000, 10000,0]
    },
  ]
},

// Configuration options go here
options: {
  scales: {
    xAxes: [{ stacked: true }],
    yAxes: [{ stacked: true }]
  }
}
    });


  }

}
