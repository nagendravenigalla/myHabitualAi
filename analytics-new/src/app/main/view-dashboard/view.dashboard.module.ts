import { NgModule } from '@angular/core';
import { ViewDashboardComponent} from './view.dashboard.component';
import { RouterModule } from '@angular/router';
import { ViewDashboardService} from './view.dashboard.service';
import {AnalyticsChartsModule} from '../charts/charts.module';
import { CommonModule } from '@angular/common';
import { CreateDialogModule} from '../create-dialog/create.dialog.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material';
import { DeleteConfirmModule} from "../delete-confirmation/delete.confirm.module";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes = [
  {
    path     : '**',
    component: ViewDashboardComponent
  }
];


@NgModule({
  declarations: [
    ViewDashboardComponent
  ],
  imports     : [
    CommonModule,
    RouterModule.forChild(routes),
    AnalyticsChartsModule,
    CreateDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
      DeleteConfirmModule,
      MatProgressSpinnerModule
  ],
  providers   : [
    ViewDashboardService
  ],
  exports     : [
    ViewDashboardComponent
  ]

})
export class ViewDashboardModule
{
}
