// chart.component.ts
import {Chart} from 'angular-highcharts';
import {Component, Input, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';


@Component({
    selector: 'fuse-line-chart',
    templateUrl: 'line.chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() chartType: string;
    @Input() chartData: any;
    @Input() chartWidth: number;
    @Input() yLabel: string;
    chart: any;
    show = false;

    constructor(private ref: ChangeDetectorRef) {

    }

    ngAfterViewInit() {
        this.show = true;
        this.reDrawChart();
    }

    ngOnInit() {
        this.show = true;
        this.reDrawChart();
    }

    ngOnChanges(values) {
        this.ref.detectChanges();
        this.reDrawChart();
    }

    reDrawChart() {
        this.show = true;
        const ylabel = this.yLabel === 'unique_users' ? 'Unique Users' : 'Transaction Count';
        this.chart = new Chart({
            chart: {
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
                type: this.chartType,
                width: this.chartWidth
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ylabel
                }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%b %y',
                    year: '%Y'
                },
                title: {
                    text: 'Duration'
                },
                plotLines: [{
                    color: 'black',
                    dashStyle: 'dot',
                    width: 2,
                    value: 50,
                    zIndex: 3
                }]
            },
            legend: {
                align: 'center',
                borderColor: '#d7dada',
                borderRadius: 5,
                borderWidth: 1,
                itemWidth: 250,
                lineHeight: 40
            },
            tooltip: {
                shared: true
            },
            series: this.chartData
        });
    }


}
