// chart.component.ts
import { Chart } from 'angular-highcharts';
import {Component, Input, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';



@Component({
  selector: 'fuse-bar-chart',
  templateUrl: 'line.chart.component.html'
})
export class BarChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chartData: any;
  chart: any;
  show = false;
  @Input() yLabel: string;

  constructor(private ref: ChangeDetectorRef){
   
  }


  ngAfterViewInit(){
    this.show = true;
    this.reDrawChart();
  }

  ngOnInit() {
    this.show = true;

    this.reDrawChart();
    this.ref.detectChanges();

  }

  ngOnChanges(values) {
    this.ref.detectChanges();
    this.reDrawChart();
  }

  reDrawChart(){
    this.show = true;
      const ylabel = this.yLabel === 'unique_users' ? 'Unique Users' : 'Transaction Count';
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        title: {
          text: ylabel
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      series: [{
        name: '',
        data: this.chartData,
        colorByPoint: true,
        crisp: false
      }]
    });
  }


}
