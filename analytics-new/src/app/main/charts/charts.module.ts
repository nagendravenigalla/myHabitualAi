import { NgModule } from '@angular/core';
import { LineChartComponent } from './line.chart.component';
import { BarChartComponent} from './bar.chart.component';
import { ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';
import {ColumnChartComponent} from "./column.chart.component";


@NgModule({
  declarations: [
    LineChartComponent,
    BarChartComponent,
      ColumnChartComponent
  ],
  imports     : [
    ChartModule,
    CommonModule
  ],
  exports     : [
    LineChartComponent,
    BarChartComponent,
      ColumnChartComponent
  ]
})
export class AnalyticsChartsModule
{
}
