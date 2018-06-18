import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {LineChartInterface} from '../../../common/line.chart.interface';
import {CommonHelper} from "../../../common/common.helper";
import { BaseConfig} from "../../../common/base.config";

@Injectable()
export class CohortService {
    public newCharts: Array<any>;
    private cohortTabUrl = "";
    private cohortUrl = "";
    baseConfig : BaseConfig;
    isLoaded: boolean = true;

    commonHelper: CommonHelper;
    constructor(private http: Http) {
        this.baseConfig = new BaseConfig();
        this.commonHelper = new CommonHelper();
        this.cohortTabUrl = this.baseConfig.getCohortTabUrl();
        this.cohortUrl = this.baseConfig.getCohortUrl();
    }

    getCohortTabsData(){
        const url = this.cohortTabUrl;
        return this.http.get(url);
    }
    cohortDataReq(obj){
        const url = this.cohortUrl;
        return this.http.post(url, 
            {
                "segment_id" : 12,
                "granularity" : "month",
                "period" : 3,
                "graph_type" : obj.graph_type,
                "metric_type" : obj.metric_type

            }
        )
    }

    getChart(data, userType) {
        return this.lineChartFormat(data, userType);
    }

    getChartDataFormat(data, type, userType) {
        if (type === "line") {
            return this.lineChartFormat(data, userType);
        } else if (type === "column") {
            return this.barChartFormat(data, userType);
        }

        return data;
    }

    lineChartFormat(data, userType) {
        const newData: Array<LineChartInterface> = [];
        if (data) {   
            
            data.cohorts.response.forEach(eachData => {
                       
                    const obj: LineChartInterface = {'name': data.event_name, data: []};
                    if (eachData.response_key.field_name !== null && eachData.response_key.attr_value !== null) {
                        obj.name = `${data.series_title}(${eachData.response_key.field_name} - ${eachData.response_key.attr_value})`;
                    } else {
                        obj.name = `${data.series_title}`;
                    }  
                    eachData.response_values.forEach(eachRes => {
                        const array = [];
                        const timestamp = eachRes.window_id * 1000;
                        const count = eachRes.unique_users;
                        array.push(timestamp);
                        array.push(count);
                        obj.data.push(array);
                       
                    });
                    newData.push(obj)
                    
            });
        }   
        return newData;
        
    }

    barChartFormat(data, userType) {
        const newData: Array<any> = [];
        if (data) {
            data.cohorts.response.forEach(eachData => {
               
                 const obj: LineChartInterface = {'name': data.event_name, data: []};
                    if (eachData.response_key.field_name !== null && eachData.response_key.attr_value !== null) {
                        obj.name = `${data.series_title}(${eachData.response_key.field_name} - ${eachData.response_key.attr_value})`;
                    } else {
                        obj.name = `${data.series_title}`;
                    }
                    eachData.response_values.forEach(eachRes => {
                        const array = [];
                        const count = eachRes.unique_users;
                        array.push(count);
                        obj.data.push(array);
                       
                    });
                    newData.push(obj)
                });
            
        }
       
        return newData;
    }

    
    


}






