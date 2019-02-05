/**
 * Created by triloq on 9/1/19.
 */
import { NgModule} from '@angular/core';
import { ConfigurationComponent} from './configuration.component';
import {viewrunComponent} from './viewrun.component';
import { ConfigurationService} from './configuration.service';
import { Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule, Http, Response} from '@angular/http';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {DeleteConfirmModule} from "../delete-confirmation/delete.confirm.module";
import {AnalyticsChartsModule} from "../charts/charts.module";
import {DateFilterModule} from '../../core/components/date-filter/date.filter.module';
import { MatMenuModule} from '@angular/material/menu';
import { TranslateModule} from "@ngx-translate/core";
import { FlexLayoutModule } from '@angular/flex-layout';
const routes: Routes = [
    {
        path     : '',
        component: ConfigurationComponent,


    },
    {
        path   :'viewrun',
        component: viewrunComponent,
    }

];
@NgModule({
    exports: [ConfigurationComponent,viewrunComponent],
    imports:      [
        CommonModule,
        MatRadioModule,
        FormsModule,
        MatSelectModule,
        HttpClientModule,
        HttpModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        DeleteConfirmModule,
        DateFilterModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TranslateModule.forChild(),
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ConfigurationComponent,viewrunComponent],
    providers: [ConfigurationService],
    //entryComponents: [EditAttributeComponent, CreateCategoryComponent]
})

export class ConfigurationModule{}