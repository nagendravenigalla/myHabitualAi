import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {LineChartInterface} from '../../../common/line.chart.interface';
import {AggregateEnum} from '../../../common/aggregateEnum';

import {CommonHelper} from "../../../common/common.helper";
import {CommonCondition} from "../../../common/gql.object";

@Injectable()
export class CohortService {
 
    commonHelper: CommonHelper;
    private graphQlUrl: string;

    constructor(private http: Http) {
        this.commonHelper = new CommonHelper();
    }

    changeChartFormatGQL(data, type, userType) {
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

    getChartDataFromGraphQl(data): Observable<any> {

        return this.http.post(this.graphQlUrl, data)
       
            .pipe(
                catchError(this.commonHelper.handleError('getChartData using graphql', {status: 500}))
            );
     
          
    }

   
    

    getStartTime(filterData) {
        let time = 0;
        if (filterData.granularity === 'daily') {
            time = this.getDailyEpochTime('start', filterData.timeWindow);
        } else if (filterData.granularity === 'monthly') {
            time = this.getMonthlyEpochTime('start', filterData.timeWindow);
        } else {
            time = this.getWeeklyEpochTime('start', filterData.timeWindow);
        }

        return time;
    }

    getEndTime(filterData) {
        let time = 0;
        if (filterData.granularity === 'daily') {
            time = this.getDailyEpochTime('end', filterData.timeWindow);
        } else if (filterData.granularity === 'monthly') {
            time = this.getMonthlyEpochTime('end', filterData.timeWindow);
        } else {
            time = this.getWeeklyEpochTime('end', filterData.timeWindow);
        }

        return time;
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

    /**
     * Gets monthly epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getMonthlyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            date.setDate(0);
            date.setMonth(date.getMonth() - timeWindow);
            epochTime = this.getUTCTime(date);
        } else {
            const date = new Date();
            date.setDate(0);
            epochTime = this.getUTCTime(date);
        }
        return epochTime;

    }

    /**
     * Gets weekly epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getWeeklyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            const days = date.getDay();
            const modDate = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
            const modifiedDate = new Date(modDate.getTime() - (timeWindow * 7 * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        } else {
            const d = new Date();
            const days = d.getDay();
            const modifiedDate = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        }
        return epochTime;
    }

    /**
     * Gets daily epoch time window
     *
     * @param time type - start or end
     * @param timeWindow - time window
     */
    private getDailyEpochTime(timeType, timeWindow) {
        let epochTime = 0;
        if (timeType === 'start') {
            const date = new Date();
            const modifiedDate = new Date(date.getTime() - (timeWindow * 24 * 60 * 60 * 1000));
            epochTime = this.getUTCTime(modifiedDate);
        } else {
            const date = new Date();
            epochTime = this.getUTCTime(date);
        }
        return epochTime;
    }

    /**
     * Gets epoct time from date
     *
     * @param date type - date type

     */
    private getUTCTime(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0) / 1000;
    }


}






