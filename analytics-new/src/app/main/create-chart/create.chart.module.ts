import {NgModule} from '@angular/core';
import {CreateChartComponent} from './create.chart.component';
import {Routes, RouterModule} from '@angular/router';
import {AnalyticsChartsModule} from '../charts/charts.module';
import {EventFilterModule} from '../event-filter/event.filter.module';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {CreateChartService} from './create.chart.service';
import {HttpClientModule} from '@angular/common/http';
import {AnalyticsTableModule} from '../analytics-table/analytics.table.module';
import {HttpModule, Http, Response} from '@angular/http';
import {HttpLinkModule} from "apollo-angular-link-http";

const routes: Routes = [
    {
        path: '',
        component: CreateChartComponent
    },
    {
        path: 'create-chart',
        component: CreateChartComponent
    },
    {
        path: 'view-chart/:id',
        component: CreateChartComponent
    },

];

@NgModule({
    declarations: [
        CreateChartComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        AnalyticsChartsModule,
        EventFilterModule,
        MatRadioModule,
        FormsModule,
        CommonModule,
        MatSelectModule,
        HttpClientModule,
        HttpModule,
        AnalyticsTableModule,
        HttpLinkModule

    ],
    providers: [
        CreateChartService
    ]
})
export class CreateChartModule {}

