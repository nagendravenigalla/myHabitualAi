import { NgModule } from '@angular/core';

import{ DateFilterService } from './dateFilter.service';
import { DateFilterComponent } from './dateFilter.component';
import { AddRunComponent} from '../../../main/habitual/add.run.component';


@NgModule({
    declarations: [
        DateFilterComponent
       
    ],
    imports:      [
     
    ],
     providers:   [
        DateFilterService
     ],
    entryComponents:  [
        AddRunComponent
    ]
  })
  export class DateFilterModule{}