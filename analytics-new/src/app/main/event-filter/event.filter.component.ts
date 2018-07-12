// chart.component.ts
import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnChanges} from '@angular/core';
import {EventSchema} from '../../common/event.interface';
import * as _ from 'lodash';
import {EventFilterService} from './event.filter.service';
import {MatDialog} from '@angular/material';
import {SaveDashboardDialogComponent} from './save.dashboard.dialog.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';


@Component({
    selector: 'fuse-event1-filter',
    templateUrl: 'event.filter.component.html',
    styleUrls: ['event.filter.component.scss']
})
export class EventFilterComponent implements OnInit, OnChanges {
    eventsData: Array<EventSchema> = [];
    userData: Array<EventSchema> = [];
    @Input() userType: number;
    @Input() event: Array<EventSchema> = [];
    @Input() user: Array<EventSchema> = [];
    @Input() dashboardData: object;
    @Output()
    userMetricChanged: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    eventDataChanged: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    saveDashboardValues: EventEmitter<any> = new EventEmitter<any>();

    constructor(private eventService: EventFilterService, public dialog: MatDialog, private ref: ChangeDetectorRef) {
        const eventSchema: EventSchema = {
            type: 'event',
            isIterable: true,
            showCopy: true,
            showWhere: true,
            showGroupBy: true,
            showActionPerformed: false,
            value: [],
            where: [],
            groupBy: [],
            actionPerformed: [],
            cancellable: false
        };
        this.eventsData.push(eventSchema);

        const userSchema: EventSchema = {
            type: 'user',
            value: [{'All Users': '', value: 'All Users'}],
            isIterable: true,
            showCopy: false,
            showWhere: true,
            showGroupBy: false,
            showActionPerformed: false,
            where: [],
            groupBy: [],
            actionPerformed: [],
            cancellable: false
        };
        this.userData.push(userSchema);

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SaveDashboardDialogComponent, {
            width: '350px',
            data: this.dashboardData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.saveDashboardValues.emit({
                    userData: this.userData,
                    eventData: this.eventsData,
                    dashboardValues: result
                });

            }
        });
    }

    eventFilterClick(type, data) {
        if (type === 'user') {
            this.eventService.getGroupableAttributes().subscribe(response => {
                const groupObj = {name: '', 'value': '', 'groupData': []};
                groupObj.groupData = this.eventService.setMetaData(response.payload);

                this.userData[data].groupBy.push(groupObj);

            });
        } else {
            this.eventService.getGroupableAttributes().subscribe(response => {
                const groupObj = {name: '', 'value': '', 'groupData': []};
                groupObj.groupData = this.eventService.setMetaData(response.payload);
                this.eventsData[data].groupBy.push(groupObj);
            });
        }
    }

    eventWhereClicked(type, data) {
        if (type === 'user') {
            this.eventService.getAttributes('user').subscribe(response => {
                const whereObj = {
                    name: '',
                    'value': '',
                    'param': [],
                    'operator': ['='],
                    dataType: '',
                    tblName: '',
                    whereData: [],
                    whereValueData: [],
                    operators: ['=', '>=', '<=']
                };
                /*whereObj.tblName = response.table_name;*/
                whereObj.whereData = this.eventService.setMetaData(response.payload);
                this.userData[data].where.push(whereObj);
            });
        } else {
            this.eventService.getAttributes('event').subscribe(response => {
                const whereObj = {
                    name: '',
                    'value': '',
                    'param': [],
                    'operator': ['='],
                    dataType: '',
                    tblName: '',
                    whereData: [],
                    whereValueData: [],
                    operators: ['=', '>=', '<=']
                };
                /*whereObj.tblName = response.table_name;*/
                whereObj.whereData = this.eventService.setMetaData(response.payload);
                this.eventsData[data].where.push(whereObj);
            });
        }

    }

    addEventActionPerformed(type, data) {
        const whereObj = {name: '', 'value': '', 'param': [], 'operator': ['='], tblName: ''};
        if (type === 'user') {
            this.userData[data].actionPerformed.push(whereObj);
        } else {
            this.eventsData[data].actionPerformed.push(whereObj);
        }

    }

    deleteFunc(type, index, event) {
        if (event.index === -1) {
            this[type].splice(index, 1);
        } else {
            this[type][index][event.val].splice(event.index, 1);
        }
        if (type === 'eventsData') {
            this.checkTopAndChangeIterable(this.eventsData);
        }
        this.changeInEventData();
    }

    eventCopyFilterClicked(type, data) {
        if (type === 'user') {
            const newData = _.cloneDeep(this.userData[data]);
            this.userData.push(newData);
        } else {
            const newData = _.cloneDeep(this.eventsData[data]);
            this.eventsData.push(newData);
        }
    }

    eventChanged(type, index, event) {
        if (type === 'user') {
            this.userData[index].value = event.data.value;
        } else {
            if(event.data) {
                this.eventsData[index].value = event.data.value;
                if (event.data.value[0].value === 'top') {
                    this.eventsData[index].showCopy = false;
                } else {
                    this.eventsData[index].showCopy = true;
                    if (this.eventsData[this.eventsData.length - 1] && this.eventsData[this.eventsData.length - 1].value.length> 0) {
                        const eventSchema: EventSchema = {
                            type: type,
                            isIterable: true,
                            showCopy: true,
                            showWhere: true,
                            showGroupBy: true,
                            showActionPerformed: false,
                            cancellable: true,
                            value: [],
                            where: [],
                            groupBy: [],
                            actionPerformed: []
                        };
                        this.eventsData.push(eventSchema);
                    }

                }
                if (type === 'event') {
                    this.checkTopAndChangeIterable(this.eventsData);
                }
            }

        }
        this.changeInEventData();
    }

    whereChanged(type, index, event) {
        if (type === 'user') {
            const obj = this.userData[index].where[event.index];
            const newObj = this.userData[index].where[event.index].whereData.filter(eachData => {
                return eachData.value === obj.value[0].value;
            });
            this.eventService.getDistAttributeValues(newObj[0].entity_name, newObj[0].attr_id).subscribe(response => {
                this.userData[index].where[event.index].param = [];
                this.userData[index].where[event.index].whereValueData = this.eventService.setWhereValues(response.payload, obj.value[0].value);
            });
        } else {
            const obj = this.eventsData[index].where[event.index];
            const newObj = this.eventsData[index].where[event.index].whereData.filter(eachData => {
                return eachData.attr_id === obj.value[0].attr_id;
            });
            this.eventService.getDistAttributeValues(newObj[0].entity_name, newObj[0].attr_id).subscribe(response => {
                this.eventsData[index].where[event.index].param = [];
                this.eventsData[index].where[event.index].whereValueData = this.eventService.setWhereValues(response.payload, obj.value[0].value);
            });
        }
    }

    whereOperatorChanged(type, index, event) {
        if (type === 'user') {
            if (this.userData[index].where[event.index].param) {
                this.changeInEventData();
            }
        } else {
            if (this.eventsData[index].where[event.index]) {
                this.changeInEventData();
            }
        }
    }

    whereValueChanged(type, index, event) {
        if (event.data) {
            this.changeInEventData();
        }
    }

    groupChanged(type, index, event) {
        /*if (type === 'user') {
            this.userData[index].groupBy[event.index].value = event.data.value;
        } else {
            this.eventsData[index].groupBy[event.index].value = event.data.value;
        }*/
        this.changeInEventData();
    }

    actionChanged(type, index, event) {
        /*if (type === 'user') {
            this.userData[index].actionPerformed[event.index].value = event.data.value;
        } else {
            this.eventsData[index].actionPerformed[event.index].value = event.data.value;
        }*/
        this.changeInEventData();
    }

    actionOperatorChanged(type, index, event) {
        /*if (type === 'user') {
            this.userData[index].actionPerformed[event.index].operator = event.data.value;
        } else {
            this.eventsData[index].actionPerformed[event.index].operator = event.data.value;
        }*/
        this.changeInEventData();
    }

    actionValueChanged(type, index, event) {
        /*if (type === 'user') {
            this.userData[index].actionPerformed[event.index].param = event.data.value;
        } else {
            this.eventsData[index].actionPerformed[event.index].param = event.data.value;
        }*/
        this.changeInEventData();
    }

    changeInUserMetric($event) {
        this.userMetricChanged.emit({'event': $event, data: this.userType});
    }

    changeInEventData() {
        this.eventDataChanged.emit({userData: this.userData, eventData: this.eventsData});
    }

    checkTopAndChangeIterable(eventsData) {
        let hasTop = false;
        eventsData.forEach(eachData => {
            if(eachData.value.length>0) {
                hasTop = hasTop || eachData.value[0].value === 'top';
            }
        });
        eventsData.forEach(eachData => {
            if (hasTop) {
                if(eachData.value.length>0) {
                    if (eachData.value[0].value === 'top') {
                        eachData.isIterable = true;
                    } else {
                        eachData.isIterable = false;
                    }
                }
            } else {
                eachData.isIterable = true;
            }
        });
    }

    ngOnInit() {
        if (this.event && this.user) {
            if (this.event) {
                this.eventsData = _.cloneDeep(this.event);
                this.event = null;
            }
            if (this.user) {
                this.userData = _.cloneDeep(this.user);
                this.user = null;
            }
            this.eventDataChanged.emit({userData: this.userData, eventData: this.eventsData});
            this.ref.detectChanges();
        }
    }

    ngOnChanges(values) {
        if (this.event && this.user) {
            let subArray = [];
            subArray.push(this.eventService.setAllEventData(this.event, 'events').map(res => {
                return {name: 'event', data: res}
            }));
            this.event = null;

            subArray.push(this.eventService.setAllEventData(this.user, 'users').map(res => {
                return {name: 'user', data: res}
            }));
            this.user = null;

            const combinedObserver = Observable.combineLatest(subArray);
            let subObject: object = {};
            combinedObserver.subscribe(res => {
                res.forEach(eachResponse => {
                    subObject[eachResponse.name] = eachResponse.data;
                });
                this.userData = _.cloneDeep(subObject['user']);
                this.eventsData = _.cloneDeep(subObject['event']);

                console.log(this.eventsData)
                this.eventDataChanged.emit({userData: this.userData, eventData: this.eventsData});
                console.log(this.eventsData)
            });
        }
    }
}
