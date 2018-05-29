import { NgModule } from '@angular/core';
import { AnalyticsTableComponent } from './analytics.table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { MatPaginatorModule } from '@angular/material';



import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AnalyticsTableComponent
  ],
  imports     : [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule
  ],
  exports     : [
    AnalyticsTableComponent
  ]
})
export class AnalyticsTableModule
{
}
