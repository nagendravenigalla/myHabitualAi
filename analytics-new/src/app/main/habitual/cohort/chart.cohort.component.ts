import {Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, OnChanges} from '@angular/core';
import {CohortService} from './cohort.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'fuse-chart-cohort',
    templateUrl: './chart.cohort.component.html',
    styleUrls: ['chart.cohort.component.scss'],
    
})

export class ChartCohortComponent implements OnChanges, OnInit{
    @Input() type: string;
    @Input() data: any;
    charts: any;
    chartMetric: string;
    
   
    constructor(private cohortService: CohortService, 
                private route: Router, public activatedRoute: ActivatedRoute,
                private ref: ChangeDetectorRef) {
          
    }

    ngOnInit(){ 
        
    }

    ngOnChanges(){
        this.charts = this.cohortService.newCharts
    }

   
 
}


