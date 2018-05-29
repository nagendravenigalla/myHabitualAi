import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy, AfterViewInit,  Input, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { DropdownDirective, TOGGLE_STATUS, DropDownValues} from './index';


@Component({
  selector   : 'fuse-oct-drop',
  templateUrl: './oct.dropdown.component.html',
  styleUrls  : ['./oct.dropdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OctDropdownComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() dropValues: any;
  @Input() selectedValue: any;
  @Input() octPlaceholder: string;
  @Output()
  changeDetected: EventEmitter<any> = new EventEmitter<any>();
  ngUnSubscribe: Subject<void> = new Subject<void>();
  status: boolean;

  @ViewChild('myDropdown') myDropdown: DropdownDirective;
  constructor(
  )
  {

  }

  ngOnDestroy(){

  }

  ngOnInit(){
    this.myDropdown.statusChange().takeUntil(this.ngUnSubscribe)
      .subscribe((status: DropDownValues) => {
        let statusValue: string = this.selectedValue;

        if (status.status === TOGGLE_STATUS.OPEN){
          // statusValue = status.value;
        }else{
          statusValue = status.value || statusValue;
        }
        this.status = status.status ? true : false;
        this.changeDetected.emit({data: statusValue});
      });
  }

  ngAfterViewInit(){
    /*this.changeDetected.emit({data: this.octPlaceholder});*/
  }
}
