import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CohortService} from './cohort.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {GQLInterface, GQLPostObject} from "../../../common/gql.object";

@Component({
    selector: 'fuse-habit-cohort',
    templateUrl: './cohort.component.html',
    styleUrls: ['cohort.component.scss']
})

export class CohortComponent {
    private subscription: any;
    charts: Array<any> = [];
    cohortData : Array<any> = [];
    dataObj = {};
    isLoaded: boolean = false;
    newSubscription: any;


    chartFilterData: any = {
        granularity: 'monthly',
        timeWindow: '12',
        startTime: 0,
        endTime: 0
    };


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

    tableData = {columnArray: [], dataArray: []};
    gqlObject: GQLInterface = {agg_level: '', endTime: 0, startTime: 0, gqlObject: {filters: []}, commonCondition: []};



    constructor(private cohortService: CohortService, private route: Router, public activatedRoute: ActivatedRoute) {

    }

    allData: any = [];
    eventsFilterData: any = {};

    changeInTimeWindow(event) {
        debugger
        this.chartFilterData.timeWindow = event.data.timeWindow;
        this.chartFilterData.granularity = event.data.granularity;
        this.chartFilterData.startTime = event.data.startTime;
        this.chartFilterData.endTime = event.data.endTime;
        this.onFilterChanges(this.eventsFilterData, this.chartFilterData.selectedChart);
    }
    onFilterChanges(eventFilterData, selectedChart) {
        debugger
        this.charts = [];
        this.isLoaded = true;
        const graphQlObject:GQLPostObject = {request_json: this.createGqlObject(eventFilterData, this.chartFilterData.startTime, this.chartFilterData.endTime, selectedChart)};
        if (this.newSubscription) {
            this.newSubscription.unsubscribe();
        }
        this.newSubscription = this.cohortService.cohortDataReq(graphQlObject).subscribe(response => {
            //this.handleFilterChangesResponseGQL(response, selectedChart);
        })
    }

    createGqlObject(eventFilterData, startTime, endTime, selectedChart) {
        const modifiedGqlObject = this.cohortService.createGqlObject(this.gqlObject, this.chartFilterData.granularity, eventFilterData, selectedChart);
        modifiedGqlObject.startTime = startTime;
        modifiedGqlObject.endTime = endTime;
        return modifiedGqlObject;
    }

  

    getCohortTabsData(){
        this.cohortService.getCohortTabsData().subscribe(response => {
            const res = response.json();

            if(res.data){
                res.data.forEach(eachres => {
                    this.cohortData.push(eachres)
                    
                })
            }
            
        });
    }
    
    reqCohortChartData(obj){
        this.charts = []
        this.isLoaded = false;
         this.cohortService.cohortDataReq(obj).subscribe(res => {
            if(res.status !== 500){
                this.isLoaded = true;
                let allData = res.json()
                if (allData.error) {
                    this.isLoaded = false;                              
                } 
                else{
                    if(allData.data){
                        allData = _.cloneDeep(allData.data)
                        const newData = this.cohortService.getChartDataFormat(allData, obj.graph_type, "userType")
                        this.charts = _.cloneDeep(newData);
                    }    
                } 
              
            }
            this.isLoaded = true;
            this.cohortService.newCharts = this.charts            
        });
        
    }
  
    ngOnInit(){
        this.getCohortTabsData()

    }

}


