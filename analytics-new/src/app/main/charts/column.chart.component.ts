// chart.component.ts
import { Chart } from 'angular-highcharts';
import {Component, Input, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';



@Component({
    selector: 'fuse-column-chart',
    templateUrl: 'line.chart.component.html'
})
export class ColumnChartComponent implements OnInit, AfterViewInit, OnChanges {
    chartData: any;
    chart: any;
    show = false;
    /*@Input() yLabel: string;*/

    constructor(private ref: ChangeDetectorRef){
        this.chartData = [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }];
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
        this.chartData = [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }];
        /*const ylabel = this.yLabel === 'user_id' ? 'Unique Users' : 'Transacton Count';*/
        this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: this.chartData
        });


    }


}
