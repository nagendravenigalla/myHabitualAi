import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {catchError, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {EventConfig} from "./event.config";
import {CommonHelper} from "../../common/common.helper";


@Injectable()
export class EventFilterService {
    private attributesUrl: string;
    private attributeValuesUrl: string;
    private groupableUrl: string;
    private eventConfig: EventConfig;
    private commonHelper: CommonHelper;
    private eventNameData: any;
    private getAttributesUrl: string;

    constructor(private http: Http) {
        this.eventConfig = new EventConfig();
        this.commonHelper = new CommonHelper();
        this.attributesUrl = this.eventConfig.getUrl('info');
        this.attributeValuesUrl = this.eventConfig.getUrl('values');
        this.groupableUrl = this.eventConfig.getUrl('groupables');
        this.getAttributesUrl = this.eventConfig.getUrl('attributes');
    }

    setAllEventData(events, type) {
        let subsArray = [];
        let serviceCallArray = [];
        subsArray.push(this.getAttributes(type).map(res => {
            return {name: type, data: res.payload}
        }));
        events.forEach(event => {
            event.where.forEach(eachWhere => {
                if (serviceCallArray.indexOf(eachWhere.value[0].value) === -1) {
                    subsArray.push(this.getDistAttributeValues(eachWhere.value[0].entity_name, eachWhere.value[0].attr_id).map(res => {
                        return {name: eachWhere.value[0].value, data: res.payload}
                    }));
                    serviceCallArray.push(eachWhere.value[0].value);
                }
            });
        });

        const simpleObservable = new Observable((observer) => {
            const combinedObservable = Observable.combineLatest(subsArray);
            let subObject: object = {};
            combinedObservable.subscribe(res => {
                res.forEach(eachResponse => {
                    subObject[eachResponse.name] = eachResponse.data;
                });

                events.forEach(event => {
                    event.where.forEach(eachWhere => {
                        eachWhere.whereData = this.setMetaData(subObject[type]);
                        eachWhere.whereValueData = this.setWhereValues(subObject[eachWhere.value[0].value], eachWhere.value[0].value);
                    })
                });
                observer.next(events);
                observer.complete();
            });


        });
        return simpleObservable;
    }

    setMetaData(data) {
        let arr = [];
        data.forEach(eachData => {
            if (eachData.displayable) {
                const obj = {
                    viewValue: eachData.display_name,
                    value: eachData.field_name,
                    dataType: eachData.data_type,
                    attr_id: eachData.attr_id,
                    entity_name: eachData.entity_name
                };
                arr.push(obj);
            }
        });
        arr = this.commonHelper.sortByProp(arr, 'value');
        return arr;
    }

    setMetaDataForEvents(data) {
        let arr = [];
        data.forEach(eachData => {
            if (eachData.attr_value) {
                const obj = {viewValue: eachData.attr_value.split('_').join(' '), value: eachData.attr_value};
                arr.push(obj);
            }
        });
        arr = this.commonHelper.sortByProp(arr, 'value');
        arr.unshift({viewValue: 'TOP EVENTS', value: 'top'});
        return arr;
    }

    setWhereValues(data, value) {
        let arr = [];
        data.forEach((eachData) => {
            if(eachData['attr_value']!==null && eachData['attr_value']!==undefined) {
                arr.push(eachData['attr_value']);
            }
        });
        return arr.sort((a, b) => {
            return a - b;
        });

    }

    getDistAttributeValues(type, attr_id): Observable<any> {
        const url = this.attributesUrl+type+'?attr_id='+attr_id;
        return this.http.get(url).map(res => {
            return res.json();
        }).pipe(
            catchError(this.commonHelper.handleError('getEventAttributes', []))
        );
    }

    getAttributes(attrType): Observable<any> {
        const url = this.getAttributesUrl + '/' + attrType;
        return this.http.get(url).map(res => {
            return res.json();
        }).pipe(catchError(
            this.commonHelper.handleError('get Attributes', [])));
    }

    getGroupableAttributes(): Observable<any> {
        return this.http.get(this.groupableUrl).map(res => {
            return res.json();
        }).pipe(
            catchError(this.commonHelper.handleError('getGroupableAttributes', []))
        );
    }

    getAttributeValues(tblName, colName): Observable<any> {
        if (colName === 'attr_value' && tblName==='event_attributes' && this.eventNameData) {
            return new Observable(observer => {
                observer.next(this.eventNameData);
                observer.complete();
            });
        }
        const url = this.attributeValuesUrl+'?col='+colName+'&tbl='+tblName;
        return this.http.get(url).map(res => {
            if (colName === 'attr_value' && !this.eventNameData) {
                
                this.eventNameData = res.json();
            }
            return res.json();
        }).pipe(
            catchError(this.commonHelper.handleError('getHeroes', []))
        );
    }
}
