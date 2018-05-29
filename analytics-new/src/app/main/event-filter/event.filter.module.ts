import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventFilterComponent} from './event.filter.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { FiltersModule} from '../filter-component/filter.module';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule} from '@angular/forms';
import { EventFilterService} from './event.filter.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule, Http, Response} from '@angular/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { SaveDashboardDialogComponent} from './save.dashboard.dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    EventFilterComponent,
    SaveDashboardDialogComponent
  ],
  imports:      [
    MatGridListModule,
    MatInputModule,
    CommonModule,
    FiltersModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    HttpModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports:      [
    EventFilterComponent,
    SaveDashboardDialogComponent
  ],
  providers:    [
    EventFilterService
  ],
  entryComponents: [SaveDashboardDialogComponent]
})
export class EventFilterModule
{
}
