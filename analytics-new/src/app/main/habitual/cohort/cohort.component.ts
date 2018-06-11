import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CohortService} from './cohort.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'fuse-habit-cohort',
    templateUrl: './cohort.component.html',
    styleUrls: ['cohort.component.scss']
})

export class CohortComponent {

    cohortData : Array<any> = [];

    chartFilterData: any = {
        granularity: 'monthly',
        timeWindow: '12',
        startTime: 0,
        endTime: 0
    };
    granulars: Array<any> = [{'displayValue': 'Daily', 'value': 'daily'},
        {'displayValue': 'Weekly', 'value': 'weekly'},
        {'displayValue': 'Monthly', 'value': 'monthly'}
    ];
    timeWindow: any = {
        'daily': [{'displayValue': '7 days', 'value': '7'},
            {'displayValue': '15 days', 'value': '15'},
            {'displayValue': '30 Days', 'value': '30'},
            {'displayValue': '90 days', 'value': '90'}],
        'weekly': [{'displayValue': '4 weeks', 'value': '4'},
            {'displayValue': '12 weeks', 'value': '12'},
            {'displayValue': '24 weeks', 'value': '24'}],
        'monthly': [{'displayValue': '1 months', 'value': '1'},
            {'displayValue': '3 months', 'value': '3'},
            {'displayValue': '6 months', 'value': '6'},
            {'displayValue': '12 months', 'value': '12'}]
    };

    data: [
        {
            "analytics": {
                "response": [
                    {
                        "response_key": {
                            "attr_value": "A",
                            "field_name": "group"
                        },
                        "response_values": [
                            {
                                "avg_txn_metric": 12,
                                "total_transactions": 34,
                                "unique_users": 21,
                                "window_id": null
                            }
                            ]
                    },
                    {
                        "response_key": {
                            "attr_value": "B",
                            "field_name": "group"
                        },
                        "response_values": [
                            {
                                "avg_txn_metric": -10,
                                "total_transactions": -23,
                                "unique_users": 12,
                                "window_id": null
                            }
                            ]
                    }
                    ]
            },
            "series_title": "ATM_BALANCE"
        },
        {
            "analytics": {
                "response": [
                    {
                        "response_key": {
                            "attr_value": "A",
                            "field_name": "group"
                        },
                        "response_values": [
                            {
                                "avg_txn_metric": 13,
                                "total_transactions": 24,
                                "unique_users": 9,
                                "window_id": null
                            }
                            ]
                    },
                    {
                        "response_key": {
                            "attr_value": "B",
                            "field_name": "group"
                        },
                        "response_values": [
                            {
                                "avg_txn_metric": -12,
                                "total_transactions": 3,
                                "unique_users": -9,
                                "window_id": null
                            }
                            ]
                    }
                    ]
            },
            "series_title": "ATM_CASH"
        }
        ];

    rows: Array<any> = [{name: 'first', type: 'line', data: this.data}, 
                        {name: 'Second name', type: 'column', data: this.data}]

    constructor(private cohortService: CohortService, private route: Router, public activatedRoute: ActivatedRoute) {

    }

    

    changeInTimeWindow(event) {
        this.chartFilterData.timeWindow = event.data.timeWindow;
        this.chartFilterData.granularity = event.data.granularity;
        this.chartFilterData.startTime = event.data.startTime;
        this.chartFilterData.endTime = event.data.endTime;
    }

    getCohortData(){
        this.cohortService.getCohortData().subscribe(response => {
            const res = response.json();

            if(res.data){
                res.data.forEach(eachres => {
                    this.cohortData.push(eachres)
                    
                })
            }
            
        });
    }

    reqCohortTabs(obj){
        //this.cohortService.cohortDataReq(obj);
    }




    ngOnInit(){
        this.getCohortData()
    }


}


