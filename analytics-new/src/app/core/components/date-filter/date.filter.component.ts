import {Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import {DateFilterService} from './date.filter.service';
import * as _ from 'lodash';

@Component({
    selector   : 'fuse-date-octo-filter',
    templateUrl: './date.filter.component.html',
    styleUrls: ['date.filter.component.scss']
})

export class DateFilterComponent implements OnInit{

    timeWindowDrop: Array<any> = [];
    @Input() granular: Array<any>;
    @Input() timeWindowList: Array<any>;
    @Output() timeWindowChanged : EventEmitter<any> = new EventEmitter();
    @Input() granularity: string;
    @Input() timeWindow: any;
    constructor( private dateFilterService: DateFilterService) {


    }

    chartFilterData: any = {
        granularity: 'monthly',
        timeWindow: '12',
        startTime: 0,
        endTime: 0
    };

    changeOfGranularity($event) {
        this.timeWindowDrop = this.timeWindowList[$event.value];
        this.chartFilterData.timeWindow = this.timeWindowDrop[0].value;
        this.chartFilterData.startTime = this.dateFilterService.getStartTime(this.chartFilterData);
        this.chartFilterData.endTime = this.dateFilterService.getEndTime(this.chartFilterData);
        const data = {startTime:this.chartFilterData.startTime, endTime: this.chartFilterData.endTime,
            timeWindow: this.chartFilterData.timeWindow, granularity: this.chartFilterData.granularity};
        this.timeWindowChanged.emit({data:data});

    }

    changeOfTimeWindow() {
        this.chartFilterData.startTime = this.dateFilterService.getStartTime(this.chartFilterData);
        this.chartFilterData.endTime = this.dateFilterService.getEndTime(this.chartFilterData);
        const data = {startTime:this.chartFilterData.startTime, endTime: this.chartFilterData.endTime,
            timeWindow: this.chartFilterData.timeWindow, granularity: this.chartFilterData.granularity};
        this.timeWindowChanged.emit({data:data});
    }

    ngOnInit(){
        this.chartFilterData.timeWindow = _.cloneDeep(this.timeWindow);
        this.chartFilterData.granularity = _.cloneDeep(this.granularity);
        this.timeWindowDrop = this.timeWindowList[this.chartFilterData.granularity];
    }


}
