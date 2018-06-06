import { NgModule } from '@angular/core';

import{ DateFilterService } from './date.filter.service';
import { DateFilterComponent } from './date.filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';



@NgModule({
    declarations: [
        DateFilterComponent

    ],
    imports:      [
        FormsModule,
        MatSelectModule,
        CommonModule
    ],
     providers:   [
        DateFilterService

     ],
    exports:    [
        DateFilterComponent
    ]
  })
  export class DateFilterModule{}
