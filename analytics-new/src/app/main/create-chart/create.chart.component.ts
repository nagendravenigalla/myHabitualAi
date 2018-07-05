// chart.component.ts
import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CreateChartService} from './create.chart.service';
import * as _ from 'lodash';
import {PostbodyInterface} from '../../common/postbody.interface';
import {Router, ActivatedRoute} from '@angular/router';
import {GQLInterface, GQLPostObject} from "../../common/gql.object";
import {GraphQlQuery} from "../../common/query.graphql";

@Component({
    selector: 'fuse-create-chart',
    templateUrl: 'create.chart.component.html',
    styleUrls: ['create.chart.component.scss']
})
export class CreateChartComponent implements OnInit {
    private subscription: any;
    definedChart = '';
    showLoader = false;
    timeWindowDrop: Array<any> = [];
    allSharedData: any;
    dashboardData = {baseName: '', dashboardName: '', description: ''};
    eventData: Array<any>;
    userData: Array<any>;
    graphQlQuery: GraphQlQuery;
    paramId: any;
    newSubscription: any;
    granulars: Array<any> = [{'displayValue': 'Daily', 'value': 'daily'}, {
        'displayValue': 'Weekly',
        'value': 'weekly'
    }, {'displayValue': 'Monthly', 'value': 'monthly'}];
    timeWindow: any = {
        'daily': [{'displayValue': '7 days', 'value': '7'},
            {'displayValue': '30 Days', 'value': '30'}, {'displayValue': '90 days', 'value': '90'}],
        'weekly': [{'displayValue': '4 weeks', 'value': '4'},
            {'displayValue': '12 weeks', 'value': '12'}, {'displayValue': '24 weeks', 'value': '24'}],
        'monthly': [{'displayValue': '3 months', 'value': '3'},
            {'displayValue': '6 months', 'value': '6'}, {'displayValue': '12 months', 'value': '12'}]
    };

    chartFilterData: any = {
        selectedChart: 1,
        previousSelectedChart: 1,
        granularity: 'monthly',
        timeWindow: '12',
        userType: 'unique_users',
        startTime: 0,
        endTime: 0
    };
    tableData = {columnArray: [], dataArray: []};
    gqlObject: GQLInterface = {agg_level: '', endTime: 0, startTime: 0, gqlObject: {filters: []}, commonCondition: []};

    constructor(private route: Router, public activatedRoute: ActivatedRoute,
                private ref: ChangeDetectorRef, private chartService: CreateChartService) {
        this.timeWindowDrop = this.timeWindow[this.chartFilterData.granularity];
        this.graphQlQuery = new GraphQlQuery();
    }

    definedChartData: any = [];
    allData: any = [];
    eventsFilterData: any = {};

    changeInTimeWindow(event){

        this.chartFilterData.timeWindow = event.data.timeWindow;
        this.chartFilterData.granularity = event.data.granularity;
        this.chartFilterData.startTime = event.data.startTime;
        this.chartFilterData.endTime = event.data.endTime;
        this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
    }

    changeChartType() {
        this.definedChart = parseInt(this.chartFilterData.selectedChart) === 1 ? 'line' :
            parseInt(this.chartFilterData.selectedChart) === 2 ? 'column' : 'area';
        if (parseInt(this.chartFilterData.selectedChart) === 2 && parseInt(this.chartFilterData.previousSelectedChart) !== 2) {
            this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
        }else if (parseInt(this.chartFilterData.previousSelectedChart) === 2){
            this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
        }
        this.chartFilterData.previousSelectedChart = _.cloneDeep(this.chartFilterData.selectedChart);
    }

    onFilterChanges(eventFilterData, selectedChart) {
        this.definedChartData = [];
        this.showLoader = true;
        const graphQlObject:GQLPostObject = {request_json: this.createGqlObject(eventFilterData, this.chartFilterData.startTime, this.chartFilterData.endTime, selectedChart)};
        if (this.newSubscription) {
            this.newSubscription.unsubscribe();
        }
        this.newSubscription = this.chartService.getChartDataFromGraphQl(graphQlObject).subscribe(response => {
            this.handleFilterChangesResponseGQL(response, selectedChart);
        })
    }

    handleFilterChangesResponseGQL(response, selectedChart) {
        if (response && response.status !== 500 && response.status !== 0) {
            try {
                const allData = response.json().data;
                this.allData = _.cloneDeep(allData);
                if (allData && allData.error === 'nodatafound') {
                    this.definedChartData = [];
                    this.tableData = {columnArray: [], dataArray: []};
                } else {
                    const newData = this.chartService.changeChartFormatGQL(allData, parseInt(this.chartFilterData.selectedChart), this.chartFilterData.userType);
                    this.definedChartData = _.cloneDeep(newData);  
                    const selectedChart = parseInt(this.chartFilterData.selectedChart);
                    this.tableData = this.chartService.getTableDataGQL(allData, this.chartFilterData.userType,selectedChart);
                    if (!this.ref['destroyed']) {
                        this.ref.detectChanges();
                    }
                }
            }
            catch (exception) {
                console.log(exception);
            }
            finally {
                this.showLoader = false;
            }
        } else {
            this.showLoader = false;
        }
       
    }

    changeOfMetric($event) {
        this.chartFilterData.userType = _.cloneDeep($event.data);
        const newData = this.chartService.changeChartFormatGQL(this.allData, parseInt(this.chartFilterData.selectedChart), this.chartFilterData.userType);
        this.definedChartData = _.cloneDeep(newData);
        const selectedChart = parseInt(this.chartFilterData.selectedChart);
        this.tableData = this.chartService.getTableDataGQL(this.allData, this.chartFilterData.userType, selectedChart);
    }

    changeOfEventsData($event) {
        this.eventsFilterData = _.cloneDeep($event);
        this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
    }

    saveDashboard($event) {
        const eventFilterData = _.cloneDeep({eventData: $event.eventData, userData: $event.userData});
        eventFilterData.eventData.forEach(eachEvent => {
            eachEvent.where.forEach(eachWhere => {
                eachWhere.whereData = [];
                eachWhere.whereValueData = [];
            })
        });
        eventFilterData.userData.forEach(eachEvent => {
            eachEvent.where.forEach(eachWhere => {
                eachWhere.whereData = [];
                eachWhere.whereValueData = [];
            })
        });
        const graphQlObject: GQLPostObject = {request_json: this.createGqlObject(eventFilterData, this.chartFilterData.startTime, this.chartFilterData.endTime, this.chartFilterData.selectedChart)};
        const postSaveDashboardObject = {
            dashboardName: $event.dashboardValues.selectedName,
            baseName: $event.dashboardValues.baseName,
            description: $event.dashboardValues.description,
            graphQl: graphQlObject,
            user_metric: this.chartFilterData.userType,
            chartMetaData: eventFilterData,
            timeSlot: this.chartFilterData.granularity,
            timeWindow: this.chartFilterData.timeWindow
        };
        if (this.paramId) {
            this.chartService.updateDashboard(postSaveDashboardObject, this.paramId).subscribe(response => {

            });
        } else {
            this.chartService.saveDashboard(postSaveDashboardObject).subscribe(response => {

            });
        }

    }

    createGqlObject(eventFilterData, startTime, endTime, selectedChart) {
        const modifiedGqlObject = this.chartService.createGqlObject(this.gqlObject, this.chartFilterData.granularity, eventFilterData, selectedChart);
        modifiedGqlObject.startTime = startTime;
        modifiedGqlObject.endTime = endTime;
        return modifiedGqlObject;
    }

    downloadFile() {
        const gqlObject = this.createGqlObject(this.eventsFilterData, this.chartFilterData.startTime, this.chartFilterData.endTime,this.chartFilterData.selectedChart);
        const downloadObject = {metric: this.chartFilterData.userType, gqlObject: {request_json: gqlObject}};
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.chartService.exportAsCSV(downloadObject).subscribe(response =>{
            if(response.status !== 500) {
                let parsedResponse = response.text();
                let blob = new Blob([parsedResponse], {type: 'text/csv'});
                let url = window.URL.createObjectURL(blob);

                if (navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, 'Book.csv');
                } else {
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'Table.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
                window.URL.revokeObjectURL(url);
            }
        });

    }

    ngOnInit() {

        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.paramId = params.id;
                this.chartService.getDashboard(params.id).subscribe(response => {
                    this.allSharedData = response.json().payload.segment_ql;
                    if (this.allSharedData) {
                        if (this.allSharedData.chartMetaData) {
                            this.dashboardData = {
                                baseName: this.allSharedData.baseName, description: this.allSharedData.description,
                                dashboardName: this.allSharedData.dashboardName
                            };
                            this.eventData = this.allSharedData.chartMetaData.eventData;
                            this.userData = this.allSharedData.chartMetaData.userData;
                            this.chartFilterData.granularity = this.allSharedData.timeSlot;
                            this.timeWindowDrop = this.timeWindow[this.chartFilterData.granularity];
                            this.chartFilterData.timeWindow = this.allSharedData.timeWindow;
                        }
                    }
                    this.chartFilterData.startTime = this.chartService.getStartTime(this.chartFilterData);
                    this.chartFilterData.endTime = this.chartService.getEndTime(this.chartFilterData);
                    this.definedChart = parseInt(this.chartFilterData.selectedChart) === 1 ? 'line' :
                        parseInt(this.chartFilterData.selectedChart) === 2 ? 'column' : 'area';
                })
            } else {
                this.chartFilterData.startTime = this.chartService.getStartTime(this.chartFilterData);
                this.chartFilterData.endTime = this.chartService.getEndTime(this.chartFilterData);
                this.definedChart = parseInt(this.chartFilterData.selectedChart) === 1 ? 'line' :
                    parseInt(this.chartFilterData.selectedChart) === 2 ? 'column' : 'area';
            }
        });
    }
}

