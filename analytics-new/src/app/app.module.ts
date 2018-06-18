import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLogoutInterceptor} from "./common/httpInterceptor";


const appRoutes: Routes = [

    {
        path        : 'create-chart',
        loadChildren: './main/create-chart/create.chart.module#CreateChartModule'
    },
    {
        path        : 'datasource',
        loadChildren: './main/datasource/data.source.module#DataSourceModule'
    },
    {
        path        : 'campaigns',
        loadChildren: './main/habitual/run.habitual.module#RunHabitualModule'
    },
    {
        path        : 'taxonomy',
        loadChildren: './main/taxonomy/taxonomy.module#TaxonomyModule'
    },
    {
        path        : 'segments',
        loadChildren: './main/view-dashboard/view.dashboard.module#ViewDashboardModule'
    },
    {
        path: 'view-chart/:id',
        loadChildren: './main/create-chart/create.chart.module#CreateChartModule'
    },
    {
        path: 'create-chart',
        loadChildren: './main/create-chart/create.chart.module#CreateChartModule'
    },
    {
        path      : '**',
        redirectTo: 'segments'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        CommonModule
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpLogoutInterceptor, multi: true }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

