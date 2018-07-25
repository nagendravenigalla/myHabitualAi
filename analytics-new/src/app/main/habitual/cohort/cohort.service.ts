import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {LineChartInterface} from '../../../common/line.chart.interface';
import {CommonHelper} from "../../../common/common.helper";
import { BaseConfig} from "../../../common/base.config";
import {CommonCondition} from "../../../common/gql.object";

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
                "period" : 1,
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
            data.forEach(eachData => {
                eachData.cohorts.response.forEach(eachAnalysis => {
                    const obj: LineChartInterface = {'name': eachData.event_name, data: []};
                    if (eachAnalysis.response_key.field_name !== null && eachAnalysis.response_key.attr_value !== null) {
                        obj.name = `${eachData.series_title}(${eachAnalysis.response_key.field_name} - ${eachAnalysis.response_key.attr_value})`;
                    } else {
                        obj.name = `${eachData.series_title}`;
                    }
                    eachAnalysis.response_values.forEach(eachRes => {
                        const array = [];
                        const timestamp = eachRes.window_id * 1000;
                        const count = eachRes.unique_users;
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
                eachData.cohorts.response.forEach(eachAnalysis => {
                    let name = '';
                    if (eachAnalysis.response_key.field_name !== null && eachAnalysis.response_key.attr_value !== null) {
                        name = `${eachData.series_title}(${eachAnalysis.response_key.field_name} - ${eachAnalysis.response_key.attr_value})`;
                    } else {
                        name = `${eachData.series_title}`;
                    }
                    eachAnalysis.response_values.forEach(eachRes => {
                        const array = [];
                        const count = eachRes.unique_users;
                        array.push(name);
                        array.push(count);
                        newData.push(array);
                    });
                });
            });
        }
        return newData;
    }

    createGqlObject(gqlObject, aggLevel, eventFilterData, selectedChart) {
        const gqlObj = _.cloneDeep(gqlObject);
        if (parseInt(selectedChart) === 2) {
            gqlObj.agg_level = null;
        } else {
            gqlObj.agg_level = aggLevel;
        }
        gqlObj.gqlObject.filters = this.getFilterConditions(eventFilterData.eventData);
        gqlObj.commonCondition = this.getCommonConditions(eventFilterData.userData);
        return gqlObj;

    }

    getFilterConditions(eventData) {
        const filterArray = [];
        if (eventData) {
            eventData.forEach(eachEventData => {
                if (eachEventData.isIterable) {
                    const obj = {'name': '', groupBy: '', conditions: []};
                    const groupArray = [];
                    eachEventData.groupBy.forEach(eachGroup => {
                        eachGroup.value.forEach(eachVal => {
                            groupArray.push(eachVal.value);
                        });
                    });
                    obj.groupBy = groupArray.join(',');
                    if (eachEventData.value) {

                        obj.name = eachEventData.value.length > 0 ? eachEventData.value[0].value : '';
                        eachEventData.where.forEach(eachData => {
                            if (eachData.param && eachData.param.length>0) {
                                const filterConditions = this.fillCondition(eachData);
                                obj.conditions.push(filterConditions);
                            }
                        });
                        filterArray.push(obj);
                    }
                }
            });
        }
        return filterArray;
    }

    getCommonConditions(userData) {
        const array = [];
        if (userData) {
            userData.forEach(eachUserData => {
                eachUserData.where.forEach(eachData => {
                    if (eachData.param) {
                        const conditionObj = this.fillCondition(eachData);
                        array.push(conditionObj);
                    }
                });
                eachUserData.actionPerformed.forEach(eachData => {
                    if (eachData.param) {
                        const conditionObj = this.fillCondition(eachData);
                        array.push(conditionObj);
                    }
                });
            });
        }
        return array;
    }


    fillCondition(eachData) {
        const obj: CommonCondition = {fieldName: '', value: '', operator: ''};
        if(eachData.value) {
            const valueArray = [];
            eachData.param.forEach(eachValue => {
                valueArray.push(eachValue);
            });
            obj.fieldName = eachData.value[0].value;
            obj.value = valueArray.join(',');
            obj.operator = eachData.operator[0];
        }
        return obj;
    }







}






