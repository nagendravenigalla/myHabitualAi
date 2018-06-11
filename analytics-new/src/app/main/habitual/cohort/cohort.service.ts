import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {LineChartInterface} from '../../../common/line.chart.interface';
import {CommonHelper} from "../../../common/common.helper";

@Injectable()
export class CohortService {

    commonHelper: CommonHelper;
    constructor(private http: Http) {
        this.commonHelper = new CommonHelper();
    }

    getCohortData(){
        const url = 'http://demo.3loq.net:8013/cohortTabs';
        return this.http.get(url);
    }
    cohortDataReq(obj){
        const url = 'http://demo.3loq.net:8013/cohorts';
        const req = this.http.post(url, 
            {
                "segment_id" : 12,
                "granularity" : "month",
                "period" : 3,
                "graph_type" : obj.graph_type,
                "metric_type" : obj.metric_type

            }
        ).subscribe(res => {
            console.log(res);
        },
        err => {
            console.log("error");
        }
        )
    }

    getChartDataFormat(data, type, userType) {
        if (type === 1 || type === 3) {
            return this.lineChartFormat(data, userType);
        } else if (type === 2) {
            return this.barChartFormat(data, userType);
        }

        return data;
    }

    lineChartFormat(data, userType) {
        const newData: Array<LineChartInterface> = [];
        if (data) {
            data.forEach(eachData => {
                eachData.analytics.response.forEach(eachAnalysis => {
                    const obj: LineChartInterface = {'name': eachData.event_name, data: []};
                    if (eachAnalysis.response_key.field_name !== null && eachAnalysis.response_key.attr_value !== null) {
                        obj.name = `${eachData.series_title}(${eachAnalysis.response_key.field_name} - ${eachAnalysis.response_key.attr_value})`;
                    } else {
                        obj.name = `${eachData.series_title}`;
                    }
                    eachAnalysis.response_values.forEach(eachRes => {
                        const array = [];
                        const timestamp = eachRes.window_id * 1000;
                        const count = eachRes[userType];
                        array.push(timestamp);
                        array.push(count);
                        obj.data.push(array);
                    });
                    newData.push(obj)
                });
            });
        }
        return newData;
    }

    barChartFormat(data, userType) {
        const newData: Array<any> = [];
        if (data) {
            data.forEach(eachData => {
                eachData.analytics.response.forEach(eachAnalysis => {
                    let name = '';
                    if (eachAnalysis.response_key.field_name !== null && eachAnalysis.response_key.attr_value !== null) {
                        name = `${eachData.series_title}(${eachAnalysis.response_key.field_name} - ${eachAnalysis.response_key.attr_value})`;
                    } else {
                        name = `${eachData.series_title}`;
                    }
                    eachAnalysis.response_values.forEach(eachRes => {
                        const array = [];
                        const count = eachRes[userType];
                        array.push(name);
                        array.push(count);
                        newData.push(array);
                    });
                });
            });
        }
        return newData;
    }
}






