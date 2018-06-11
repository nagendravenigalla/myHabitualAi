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

    charts: Array<any> = [];
    chartMetric: string;

    cdata: any =[
            {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }
    ]
     
    constructor(private cohortService: CohortService, private route: Router, public activatedRoute: ActivatedRoute) {

    }

    

    ngOnInit(){
        
    }

    ngOnChanges(){

    }

   
 
}


