import {Component, Input, OnInit, ChangeDetectorRef, Renderer, ElementRef, forwardRef, OnChanges} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _ from 'lodash';

const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchableDropdownComponent),
    multi: true
};

@Component({
    selector: 'search-drop-down',
    templateUrl: './searchable-drop-down.html',
    styleUrls  : ['search-drop-down.scss'],
    host: {'(change)': 'manualChange($event)', '(document:click)': 'hostClick($event)'},
    providers: [MULTISELECT_VALUE_ACCESSOR]
})

export class SearchableDropdownComponent implements OnInit, OnChanges, ControlValueAccessor{
    public _selectedItems: any;
    public localHeader;
    public isOpen = false;
    public enableFilter: boolean;
    public filterText: string;
    public filterPlaceholder: string;
    private item;

    @Input() items: any;
    @Input() header;

    // ControlValueAccessor Interface and mutator
    private _onChange = (_: any) => '';
    private _onTouched = () => {};

    constructor(private _elRef: ElementRef, private _renderer: Renderer, /*private _equalPipe: EqualPipe,*/ private _changeDetectorRef: ChangeDetectorRef) {

    }

    private _value: any = '';
    get value(): any { return this._value; };

    writeValue(value: any) {
        if (value) {
            const item = this.items.filter(eachItem => {
                return eachItem.value === value;
            });
            this.item = _.cloneDeep(item[0]);
            this.setHeaderText(item[0]);
            if (value !== undefined) {
                this._selectedItems = value;
            } else {
                this._selectedItems = '';

            }
        }else{
            this.localHeader = _.cloneDeep(this.header);
        }
    }

    setHeaderText(item = null) {
        this.localHeader = _.cloneDeep(this.header);
        if (this.item){
            this.localHeader = _.cloneDeep(this.item.viewValue);
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: () => any): void { this._onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setElementProperty(this._elRef.nativeElement, 'disabled', isDisabled);
    }

    manualChange($event) {
        this._onChange(this._selectedItems);
    }

    select(item: any) {
        this.item = _.cloneDeep(item);
        this._selectedItems = _.cloneDeep(item.value);
        this.setHeaderText(item);
        this._onChange(item);
        this.toggleSelect();
    }

    toggleSelect() {
        this.isOpen = !this.isOpen;
    }

    clearFilter() {
        this.filterText = '';
    }

    hostClick(event) {
        if(!this._selectedItems){
            this.item = null;
            this.setHeaderText();
        }
        if (this.isOpen && !this._elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

    ngOnInit() {
        this.enableFilter = true;
        if (typeof this.items[0] === 'string'){
            const arr = [];
            this.items.forEach(eachItem => {
                const obj = {value: eachItem, viewValue: eachItem.split('_').join(' ')};
                arr.push(obj);
            });
            this.items = _.cloneDeep(arr);
        }else if(typeof this.items[0] === "number"){
            const arr = [];
            this.items.forEach(eachItem => {
                const obj = {value: eachItem, viewValue: eachItem};
                arr.push(obj);
            });
            this.items = _.cloneDeep(arr);
        }
    }

    ngOnChanges(){

        this._changeDetectorRef.detectChanges();
        if (typeof this.items[0] === 'string'){
            const arr = [];
            this.items.forEach(eachItem => {
                const obj = {value: eachItem, viewValue: eachItem.split('_').join(' ')};
                arr.push(obj);
            });
            this.items = _.cloneDeep(arr);
        }else if(typeof this.items[0] === "number"){
            const arr = [];
            this.items.forEach(eachItem => {
                const obj = {value: eachItem, viewValue: eachItem};
                arr.push(obj);
            });
            this.items = _.cloneDeep(arr);
        }
        if (this._selectedItems) {
            const item = this.items.filter(eachItem => {
               return eachItem.value === this._selectedItems;
            });
            this.item = _.cloneDeep(item[0]);
            this.setHeaderText(item[0]);
        }else{
            this.setHeaderText();
        }


    }

}

/*@Pipe({
    name: 'equal'
})

export class EqualPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            return items;
            /!*return items.filter(item =>
                filterKeys.reduce((memo, keyName) => {
                    //console.log('Comparing');
                    return item[keyName] === filter[keyName];}, true)
            );*!/
        } else {
            return items;
        }
    }
}*/

@Pipe({
    name: 'filter'
})

export class DropSearchFilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        if (filter && Array.isArray(items)) {
            const filterKeys = Object.keys(filter);
            return items.filter(item =>
                filterKeys.reduce((memo, keyName) =>
                    (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
        } else {
            return items;
        }
    }
}
