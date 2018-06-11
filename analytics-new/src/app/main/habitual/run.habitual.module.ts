import {NgModule} from '@angular/core';

// Modules
import {Routes, RouterModule} from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
import {DeleteConfirmModule} from "../delete-confirmation/delete.confirm.module";
import {AnalyticsChartsModule} from "../charts/charts.module";
import {DateFilterModule} from '../../core/components/date-filter/date.filter.module';
// Components
import {ChartCohortComponent} from "./cohort/chart.cohort.component";
import {RunHabitualComponent} from './run.habitual.component';
import {AddRunComponent} from './add.run.component';
import {HabitualComponent} from "./habitual.component";
import {CohortComponent} from "./cohort/cohort.component";
// Service
import {CohortService} from './cohort/cohort.service';
import {RunHabitualService} from './run.habitual.service';

const routes: Routes = [
    {
        path: '',
        component: HabitualComponent,
        children: [
            {path: '', redirectTo: 'habitual', pathMatch: 'full'},
            {path: 'comparison/:id', component: CohortComponent},
            {path: 'habitual', component: RunHabitualComponent},

        ],
    }
];

@NgModule({
    declarations: [
        RunHabitualComponent,
        AddRunComponent,
        HabitualComponent,
        CohortComponent,
        ChartCohortComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatRadioModule,
        FormsModule,
        CommonModule,
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
        DeleteConfirmModule,
        MatProgressSpinnerModule,
        AnalyticsChartsModule,
        DateFilterModule,
        MatTabsModule

    ],
    providers: [
        RunHabitualService, CohortService, 
    
    ],
    entryComponents: [
        AddRunComponent
    ],
    exports:    [
        ChartCohortComponent
    ]

})
export class RunHabitualModule {
}
