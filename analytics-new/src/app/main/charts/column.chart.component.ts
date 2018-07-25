// chart.component.ts
import { Chart } from 'angular-highcharts';
import {Component, Input, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';



@Component({
    selector: 'fuse-column-chart',
    templateUrl: 'line.chart.component.html'
})
export class ColumnChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() chartType: string;
    @Input() chartData: any;
    chart: any;
    show = false;
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
        this.chart = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories:this.chartData,

                crosshair: true,
                plotLines: [{
                    color: 'black',
                    dashStyle: 'dot',
                    width: 2,
                    //value: this.chartData.length/2,
                    zIndex: 3,
                    label: {
                        align: 'right',
                        rotation: 0,
                        text: 'Recommendation Sent',
                        x: -10
                    },
                }]

            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                },
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
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
