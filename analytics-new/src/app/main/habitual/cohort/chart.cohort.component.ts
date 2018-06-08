import {Component, OnInit, ChangeDetectorRef, Input, Output, OnChanges} from '@angular/core';
import {CohortService} from './cohort.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'fuse-chart-cohort',
    templateUrl: './chart.cohort.component.html',
    styleUrls: ['chart.cohort.component.scss']
})

export class ChartCohortComponent implements OnChanges, OnInit{
    @Input() type: string;
    @Input() data: any;
     
    constructor(private cohortService: CohortService, private route: Router, public activatedRoute: ActivatedRoute) {

    }

    ngOnInit(){

    }

    ngOnChanges(){

    }
}


