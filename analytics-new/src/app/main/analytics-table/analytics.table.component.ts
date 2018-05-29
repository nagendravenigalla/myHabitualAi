// chart.component.ts
import {Component, Input,Output, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {CommonHelper} from '../../common/common.helper';


@Component({
  selector: 'fuse-table-chart',
  templateUrl: 'analytics.table.component.html',
  styleUrls: ['analytics.table.component.scss']
})


export class AnalyticsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chartData: any;
  @Output()
  exportedAsCSV: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns = [];
  nonChangingData = [];
  commonHelper: CommonHelper;
  arrowName: any;
  reverseObject: LooseObject = {};
  constructor(private ref: ChangeDetectorRef) {
    this.commonHelper = new CommonHelper();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    /*this.dataSource.sort = this.sort;*/
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    /*this.dataSource.filter = filterValue;*/
    if(filterValue){
        this.chartData.dataArray = this.nonChangingData.filter(eachData => {
          return eachData['Event'].toLowerCase().match(filterValue)!==null;
        })
    }else{
        this.chartData.dataArray = _.cloneDeep(this.nonChangingData);
    }

  }

  formatDate(data){
    if (isNaN(data)){
      return data;
    }else {
      return moment.unix(data).format('DD MMM YYYY');
    }
  }

  sortTable(variable){
    this.arrowName = variable;
    this.chartData.dataArray = this.commonHelper.sortByProp(this.chartData.dataArray, variable);
    if(this.reverseObject[variable]){
        this.chartData.dataArray.reverse();
    }
    this.reverseObject[variable] = _.cloneDeep(!this.reverseObject[variable]);
    this.changeReverseValuesForOthers(variable);
  }

  ngOnInit() {

  }

  ngOnChanges(values) {
    this.ref.detectChanges();
    this.displayedColumns = this.chartData.columnArray;
    this.reverseObject = this.populateReverseArray();
    this.nonChangingData = _.cloneDeep(this.chartData.dataArray);
  }

  populateReverseArray(){
    const obj = {};
    this.displayedColumns.forEach(column => {
        obj[column] = false;
    });
    return obj;
  }

  changeReverseValuesForOthers(variable){
      for (let key in this.reverseObject) {
          if(variable !== key) {
              this.reverseObject[key] = false;
          }
      }
  }

  exportAsCSV($event){
      this.exportedAsCSV.emit({'event': $event});
  }

}

interface LooseObject {
    [key: string]: boolean
}


