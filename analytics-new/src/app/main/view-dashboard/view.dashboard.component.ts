// chart.component.ts
import {Component, AfterViewInit, OnInit, ChangeDetectorRef, OnChanges, OnDestroy} from '@angular/core';
import { ViewDashboardService} from './view.dashboard.service';
import { Router} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteConfirmation} from "../delete-confirmation/delete.confirmation";

@Component({
  selector: 'fuse-view-dashboard',
  templateUrl: 'view.dashboard.component.html',
  styleUrls: ['view.dashboard.component.scss']
})


export class ViewDashboardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  charts: Array<any> = [];
  dashboardLoaded: boolean = true;
  subscriptions: Array<any> = [];
  chartMetric: string;
  constructor(private ref: ChangeDetectorRef, public viewDashboardService: ViewDashboardService,
              private router: Router,
              private dialog: MatDialog) {


  }

  openDialog(event): void {
      const dialogRef = this.dialog.open(DeleteConfirmation, {
          width: '600px',
          data: event
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
            this.viewDashboardService.deleteDashboard(result.id).subscribe(response => {
                this.charts = this.charts.filter(chart => {
                    return chart.id !== result.id;
                });
            });

        }
      });
  }

  goToViewChart(chart){
    this.router.navigate(['/view-chart/' + chart.id]);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

  }


  ngOnInit() {
    this.dashboardLoaded = false;
    this.viewDashboardService.getAllDashboards().subscribe(response => {
        this.dashboardLoaded = true;
      const result = response.json();
      if(result.payload) {
          result.payload.forEach(eachResponse => {
              const obj = {
                  definedChart: 'line',
                  definedChartData: [],
                  id: eachResponse.segment_hash,
                  chartId: eachResponse.segment_id,
                  allData: eachResponse.segment_ql
              };
              this.charts.push(obj);
          });

          this.charts.forEach(eachChart => {
              if(eachChart.allData) {
                  const subscription = this.viewDashboardService.getChartDataFromGraphQl(eachChart.allData.graphQl).subscribe(resp => {
                      if (resp.status !== 500) {
                          let allData = resp.json();
                          if (allData.error) {
                              eachChart.isLoaded = true;
                              eachChart.definedChartData = [];
                          } else {
                              if (allData.data) {
                                  allData = _.cloneDeep(allData.data);
                                  const newData = this.viewDashboardService.getChart(allData, eachChart.allData.user_metric);

                                  eachChart.definedChartData = _.cloneDeep(newData);
                                  if (!this.ref['destroyed']) {
                                      this.ref.detectChanges();
                                  }
                              }
                          }
                      }
                      eachChart.isLoaded = true;
                      eachChart.chartMetric = eachChart.allData.user_metric;
                  });
                  this.subscriptions.push(subscription);
              }else{
                  eachChart.allData = {};
                  eachChart.isLoaded = true;
              }
          });
      }
    });
  }

  ngOnChanges(values) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.ref.detach();

  }

  deleteBoard(board, event){
    event.stopPropagation();
      this.openDialog(board);

  }
}


