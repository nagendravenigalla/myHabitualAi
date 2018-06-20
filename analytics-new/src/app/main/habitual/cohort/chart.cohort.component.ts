import {Component, OnInit, ChangeDetectorRef, Input, Output, OnChanges} from '@angular/core';
import {CohortService} from './cohort.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'fuse-chart-cohort',
    templateUrl: './chart.cohort.component.html',
    styleUrls: ['chart.cohort.component.scss']
})

export class ChartCohortComponent implements OnChanges, OnInit{
    @Input() type: string;
    @Input() data: any;
    @Input() obj: any;

    charts: any;
    chartMetric: string;
    
   
    constructor(private cohortService: CohortService, private route: Router, public activatedRoute: ActivatedRoute) {
          
    }

    ngOnInit(){ 
        
        
    }

    ngOnChanges(){
        this.charts = this.cohortService.newCharts
    }

   
 
}


