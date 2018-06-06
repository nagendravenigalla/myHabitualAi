import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {DateFilterService} from './dateFilter.service';
import {Router, ActivatedRoute} from '@angular/router';
import { EventEmitter, Output } from '@angular/core';

import {GQLInterface, GQLPostObject} from "../../../common/gql.object";
import {GraphQlQuery} from "../../../common/query.graphql";
import {PostbodyInterface} from '../../../common/postbody.interface';

@Component({
    selector   : 'fuse-date-filter',
    templateUrl: './dateFilter.component.html',
    styleUrls: ['dateFilter.component.scss']
})

export class DateFilterComponent{

    private subscription: any;
    definedChart = '';
    showLoader = false;
    timeWindowDrop: Array<any> = [];
    graphQlQuery: GraphQlQuery;
    newSubscription: any;

    @Output() selectionChange : EventEmitter<any> = new EventEmitter()

  

    granulars: Array<any> = [{'displayValue': 'Daily', 'value': 'daily'}, 
                             {'displayValue': 'Weekly', 'value': 'weekly'}, 
                             {'displayValue': 'Monthly', 'value': 'monthly'}
                            ];
    timeWindow: any = {
        'daily': [{'displayValue': '7 days', 'value': '7'}, 
                    {'displayValue': '15 days', 'value': '15'},
                    {'displayValue': '30 Days', 'value': '30'},
                     {'displayValue': '90 days', 'value': '90'}],
        'weekly': [{'displayValue': '4 weeks', 'value': '4'},
                    {'displayValue': '12 weeks', 'value': '12'}, 
                    {'displayValue': '24 weeks', 'value': '24'}],
        'monthly': [{'displayValue': '1 months', 'value': '1'}, 
                     {'displayValue': '3 months', 'value': '3'},
                     {'displayValue': '6 months', 'value': '6'}, 
                     {'displayValue': '12 months', 'value': '12'}]
    };

    constructor( private dateFilterService: DateFilterComponent, private route: Router, public activatedRoute: ActivatedRoute) {
        this.timeWindowDrop = this.timeWindow[this.chartFilterData.granularity];
        this.graphQlQuery = new GraphQlQuery();
        }

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
    rql: PostbodyInterface = {
        entity: 'user_event_view_month', fields: [], aggregate: {aggregateType: '', column: ''},
        filters: [], group: {fields: []}, sort: {fields: [], sortOrder: 'ASC'}
    };
    gqlObject: GQLInterface = {agg_level: '', endTime: 0, startTime: 0, gqlObject: {filters: []}, commonCondition: []};


    definedChartData: any = [];
    allData: any = [];
    eventsFilterData: any = {};


    /**changeOfGranularity($event) {
        
        this.timeWindowDrop = this.timeWindow[$event.value];
        this.chartFilterData.timeWindow = this.timeWindowDrop[0].value;
        this.chartFilterData.startTime = this.dateFilterService.getStartTime(this.chartFilterData);
        this.chartFilterData.endTime = this.dateFilterService.getEndTime(this.chartFilterData);
        this.setEntity();
        this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);

        this.selectionChange.emit([$event])
     
    }

    changeOfTimeWindow() {
       
        this.chartFilterData.startTime = this.dateFilterService.getStartTime(this.chartFilterData);
        this.chartFilterData.endTime = this.dateFilterService.getEndTime(this.chartFilterData);
        this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
    }
    onFilterChanges(eventFilterData, selectedChart) {
        this.definedChartData = [];
        this.showLoader = true;
        const graphQlObject:GQLPostObject = {request_json: this.createGqlObject(eventFilterData, this.chartFilterData.startTime, this.chartFilterData.endTime, selectedChart)};
        if (this.newSubscription) {
            this.newSubscription.unsubscribe();
        }
       
        this.newSubscription = this.dateFilterService.getChartDataFromGraphQl(graphQlObject).subscribe(response => {
            this.handleFilterChangesResponseGQL(response, selectedChart);
            debugger
        })
    }


    setEntity() {
        let entityName = '';
        if (this.chartFilterData.granularity === 'monthly') {
            entityName = 'user_event_view_month';
        } else if (this.chartFilterData.granularity === 'weekly') {
            entityName = 'user_event_view_week';
        } else {
            entityName = 'user_event_view_day';
        }
        this.rql.entity = entityName;

    }

    createGqlObject(eventFilterData, startTime, endTime, selectedChart) {
        const modifiedGqlObject = this.dateFilterService.createGqlObject(this.gqlObject, this.chartFilterData.granularity, eventFilterData, selectedChart);
        modifiedGqlObject.startTime = startTime;
        modifiedGqlObject.endTime = endTime;
        return modifiedGqlObject;
    }

    handleFilterChangesResponseGQL(response, selectedChart) {
        if (response && response.status !== 500 && response.status !== 0) {
            try {
                const allData = response.json().data;
                //this.allData = _.cloneDeep(allData);
                if (allData && allData.error === 'nodatafound') {
                    this.definedChartData = [];
                    this.tableData = {columnArray: [], dataArray: []};
                } else {
                    const newData = this.dateFilterService.changeChartFormatGQL(allData, parseInt(this.chartFilterData.selectedChart), this.chartFilterData.userType);
                   // this.definedChartData = _.cloneDeep(newData);
                    const selectedChart = parseInt(this.chartFilterData.selectedChart);
                   /** this.tableData = this.chartService.getTableDataGQL(allData, this.chartFilterData.userType,selectedChart);
                    if (!this.ref['destroyed']) {
                        this.ref.detectChanges();
                    }**/
                /**}
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
    }**/

}