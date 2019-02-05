/**
 * Created by triloq on 9/1/19.
 */
import {Component,OnInit, ViewChild, ViewChildren,QueryList, AfterViewInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { Moment } from 'moment';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { DatePipe } from '@angular/common';
import {ConfigurationService} from './configuration.service';
import { Router,ActivatedRoute } from '@angular/router';

import { MatMenuModule} from '@angular/material/menu';
import {ArrayType} from "@angular/compiler/src/output/output_ast";


export interface PeriodicElement {

    created_by: string;
    created_on: Date;
    saved_name: string;
    template_name: string;
    template_id: number;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: '2018-11-16T00:00:00', symbol: 'H'},
    {position: 2, name: 'Helium', weight: '2018-11-16T00:00:00', symbol: 'He'},
    {position: 3, name: 'Lithium', weight: '2018-11-16T00:00:00', symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: '2018-11-16T00:00:00', symbol: 'Be'},
    {position: 5, name: 'Boron', weight: '2018-11-16T00:00:00', symbol: 'B'},
    {position: 6, name: 'Carbon', weight: '2018-11-16T00:00:00', symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: '2018-11-16T00:00:00', symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: '2018-11-16T00:00:00', symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: '2018-11-16T00:00:00', symbol: 'F'},

];*/
export interface PeriodicElement1 {

    position: number;
    name: string;
    weight: string;
    symbol: string;
}

/*const ELEMENT_DATA1: PeriodicElement1[] = [
    {position: 1, name: 'Hydrogen', weight: '2018-11-15T00:00:00', symbol: 'H'},
    {position: 2, name: 'Helium', weight: '2018-11-16T00:00:00', symbol: 'He'},
    {position: 3, name: 'Lithium', weight: '2018-11-16T00:00:00', symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: '2018-11-16T00:00:00', symbol: 'Be'},
    {position: 5, name: 'Boron', weight: '2018-11-16T00:00:00', symbol: 'B'},
    {position: 6, name: 'Carbon', weight: '2018-11-16T00:00:00', symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: '2018-11-16T00:00:00', symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: '2018-11-16T00:00:00', symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: '2018-11-16T00:00:00', symbol: 'F'},

];*/


@Component({
    selector   : 'fuse-configuration',
    templateUrl: './configuration.component.html',
    styleUrls:  ['configuration.component.scss']
})

export class ConfigurationComponent implements OnInit,AfterViewInit{
    displayedColumns: string[] = ['config_id', 'name', 'weight', 'symbol'];
    DataSource : MatTableDataSource<PeriodicElement>;
    dataSource : MatTableDataSource<PeriodicElement1>;
    Configs : any;
    @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
    @ViewChildren(MatSort) sort = new QueryList<MatSort>();
    pipe: DatePipe;

constructor( private configservice: ConfigurationService,private router: Router,private route: ActivatedRoute,){
    this.DataSource = new MatTableDataSource<PeriodicElement>([]);
    this.dataSource = new MatTableDataSource<PeriodicElement1>([]);
    /*this.pipe = new DatePipe('en');
    console.log(this.dataSource.filterPredicate);
    const defaultPredicate=this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) =>{
        const formatted=this.pipe.transform(data.weight,'yyyy/MM/dd');
        return formatted.indexOf(filter) >= 0 || defaultPredicate(data,filter) ;
    }*/

}
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    ngOnInit()
    {


    }



    ngAfterViewInit() {
        this.configservice.getConfig()
            .subscribe(data => {
                this.Configs = data;
                // Add this row
                this.DataSource.data = data;
                this.dataSource.data = data;
            });
        this.DataSource.paginator = this.paginator.toArray()[1];
        //this.DataSource.sort = this.sort.toArray()[1];
        this.dataSource.paginator = this.paginator.toArray()[0];
        //this.dataSource.sort = this.sort.toArray()[0];


    }

}



