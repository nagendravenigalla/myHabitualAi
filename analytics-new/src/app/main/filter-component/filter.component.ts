// chart.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import {EventSchema} from '../../common/event.interface';
import { EventFilterService} from '../event-filter/event.filter.service';
import {each} from "async";


@Component({
  selector: 'fuse-event-filter',
  templateUrl: 'filter.component.html',
  styleUrls  : ['filter.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges{
  @Input() showSelect: boolean;
  @Input() wheres: Array<any>;
  @Input() eventData: EventSchema;
  @Input() whereUsers: Array<any>;
  operators:Array<string> = ['=', '<=', '>='];
    config = {
        displayKey:"viewValue", //if objects array passed which key to be displayed defaults to description
        search:true,
    };
  constructor(private eventService: EventFilterService, private ref: ChangeDetectorRef){

  }
  events: Array<any> = [{'viewValue': 'Top Events', 'value': 'top'},
    {'viewValue': 'Any Events', 'value': 'IB_BILLPAY'}, {'viewValue': 'Specific Events', 'value': 'IB_FUND_TRANSFER'}];


  @Output()
  groupByClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  whereClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  copyFilterClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  actionPerformedClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  eventSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  whereSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  whereOperatorSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  whereValueSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  groupSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  actionSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  actionOperatorSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  actionValueSelection: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteClauseEvent: EventEmitter<any> = new EventEmitter<any>();

  addGroupBy($event){
    if (this.eventData.isIterable) {
      this.groupByClicked.emit({'event': $event, data: this.eventData});
    }
  }
  addWhere($event){
    if (this.eventData.isIterable) {
      this.whereClicked.emit({'event': $event, data: this.eventData});
    }
  }
  copyFilter($event){
    if (this.eventData.isIterable) {
      this.copyFilterClicked.emit({'event': $event, data: this.eventData});
    }
  }

  addActionPerformed($event){
    if (this.eventData.isIterable) {
      this.actionPerformedClicked.emit({'event': $event, data: this.eventData});
    }
  }

  eventSelected($event, index){
    this.eventSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  whereSelected($event, index){
      this.whereSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  whereChange(property, index,where){
    const applyProperty = property.value[0];
    where.dataType = applyProperty.dataType;
    where.tblName = applyProperty.tableName;
    if(applyProperty.dataType) {
        if (applyProperty.dataType.toLowerCase() === 'integer') {
            where.operators = ['=', '<=', '>='];
        } else {
            where.operators = ['='];
        }
    }else{
        where.operators = ['=', '<=', '>='];
    }
      this.whereSelected(property,index);
  }

  whereOperatorSelected($event, index){
    this.whereOperatorSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  whereValueSelected($event, index, value){
      this.ref.detectChanges();
      this.whereValueSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  groupSelected($event, index){
    this.groupSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  actionSelected($event, index){
    this.actionSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  actionOperatorSelected($event, index){
    this.actionOperatorSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  actionValueSelected($event, index){
    this.actionValueSelection.emit({'event': $event, data: this.eventData, index: index});
  }

  deleteClause($event, index, value){
      this.ref.detectChanges();
      this.deleteClauseEvent.emit({'event': $event, data: this.eventData, index: index, val: value});
  }

  ngOnInit(){
    this.eventData.where.forEach(eachWhere => {
      if(eachWhere.dataType) {
          if (eachWhere.dataType.toLowerCase() !== 'integer') {
              eachWhere.operators = ['='];
          } else {
              eachWhere.operators = ['=', '<=', '>='];
          }
      }else{
          eachWhere.operators = ['=', '<=', '>='];
      }
    });
    this.eventService.getAttributeValues('event_attributes', 'attr_value').subscribe( response => {
      if(response.payload) {
          this.events = this.eventService.setMetaDataForEvents(response.payload);
      }
    });
      /*this.eventData.value = [{viewValue: "BRANCH STANDING INS", value: "BRANCH_STANDING_INS"},{viewValue: "IB ASSET PRODUCT", value: "IB_ASSET_PRODUCT"},{viewValue: "ATM BILLPAY", value: "ATM_BILLPAY"},{viewValue: "IB BALANCE", value: "IB_BALANCE"},
          {viewValue: "ATM CASH", value: "ATM_CASH"}]*/
  }

  ngOnChanges(){
      /*this.ref.detectChanges();*/

  }
    selectionChanged(event){

    }

}
