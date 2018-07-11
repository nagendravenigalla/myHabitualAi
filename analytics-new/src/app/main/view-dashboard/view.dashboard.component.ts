// chart.component.ts
import {Component, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges, OnDestroy} from '@angular/core';
import {ViewDashboardService} from './view.dashboard.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DeleteConfirmation} from "../delete-confirmation/delete.confirmation";

@Component({
    selector: 'fuse-view-dashboard',
    templateUrl: 'view.dashboard.component.html',
    styleUrls: ['view.dashboard.component.scss']
})


export class ViewDashboardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    charts: Array<any> = [];
    dashboardLoaded: boolean = true;
    subscriptions: Array<any> = [];
    chartMetric: string;
    step: number = 5;
    page: number = 1;
    start: number = 1;
    end: number = this.step;
    totalCount: number = 0;
    paginateObj = {sort: 'segment_id', limit: this.step, order: 'desc', offset: 0, count: true};

    constructor(private ref: ChangeDetectorRef, public viewDashboardService: ViewDashboardService,
                private router: Router,
                private dialog: MatDialog) {
        this.paginateObj.limit = this.step;
    }

    openDialog(event): void {

        const dialogRef = this.dialog.open(DeleteConfirmation, {
            width: '600px',
            data: event
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.viewDashboardService.deleteDashboard(result.id).subscribe(response => {
                    this.charts = this.charts.filter(chart => {
                        return chart.id !== result.id;
                    });
                });

            }
        });
    }

    goToViewChart(chart) {
        this.router.navigate(['/view-chart/' + chart.id])
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {

    }

    getData(){
        this.charts = [];
        this.start = this.getStart();
        this.end = this.getEnd();
        this.dashboardLoaded = false;
        this.viewDashboardService.getAllDashboards(this.paginateObj).subscribe(response => {
            this.dashboardLoaded = true;
            const result = response.json();
            if (result.payload && result.payload.data) {
                if(this.paginateObj.count && result.payload.count) {
                    this.totalCount = result.payload.count;
                }
                result.payload.data.forEach(eachResponse => {
                
                    const obj = {
                        definedChart: 'line',
                        definedChartData: [],
                       
                        id: eachResponse.segment_id,
                        chartId: eachResponse.segment_id,
                        allData: eachResponse.graph_ql
                    };
                    this.charts.push(obj);
                });
                this.end = this.getEnd();
                this.charts.forEach(eachChart => {
               
                    if (eachChart.allData) {
                        console.log(eachChart.allData)
                        const subscription = this.viewDashboardService.getChartDataFromGraphQl(eachChart.allData.graphQl).subscribe(resp => {
                            if (resp.status !== 500) {
                                let allData = resp.json();
                                if (allData.error) {
                                    eachChart.isLoaded = true;
                                    eachChart.definedChartData = [];
                                                   																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																							
                                } else {
                                    if (allData.data) {
                                        allData = _.cloneDeep(allData.data);
                                        const newData = this.viewDashboardService.getChart(allData, eachChart.allData.user_metric);
                                    
                                        eachChart.definedChartData = _.cloneDeep(newData);
                                    
                                        if (!this.ref['destroyed']) {
                                            this.ref.detectChanges();
                                        }
                                    }
                                }
                            }
                            eachChart.isLoaded = true;
                            eachChart.chartMetric = eachChart.allData.user_metric;
                        });
                        this.subscriptions.push(subscription);
                    } else {
                        eachChart.allData = {};
                        eachChart.isLoaded = true;
                    }
                });
            }
        });
    }

    ngOnInit() {
        this.getData();
    }

    ngOnChanges(values) {

    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        this.ref.detach();

    }

    deleteBoard(board, event) {
        event.stopPropagation();
        this.openDialog(board);

    }

    goToPrevious(){
        if(this.page>1) {
            this.paginateObj.count = false;
            this.paginateObj.offset--;
            this.page = this.paginateObj.offset+1;
            this.getData();

        }
    }

    goToNext(){
        if(this.step*this.page<this.totalCount) {
            this.paginateObj.count = false;
            this.paginateObj.offset++;
            this.page = this.paginateObj.offset+1;
            this.getData();

        }
    }

    getStart() {
        const val = (this.page-1) * this.step + 1;
        return val;
    }

    getEnd() {
        console.log(this.charts.length, this.step, this.page);
        if (this.charts.length < this.step) {
            return (this.page - 1) * this.step + this.charts.length;
        } else {
            return this.page * this.step;
        }
    }
}


