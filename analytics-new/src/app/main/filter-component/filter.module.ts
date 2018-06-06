import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltersComponent} from './filter.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
  import { SelectDropDownModule } from '../../core/components/multi-select-dropdown/ngx-select-dropdown.module';


@NgModule({
  declarations: [
    FiltersComponent
  ],
  imports:      [
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
      SelectDropDownModule
  ],
  exports:      [
    FiltersComponent
  ]
})
export class FiltersModule
{
}
