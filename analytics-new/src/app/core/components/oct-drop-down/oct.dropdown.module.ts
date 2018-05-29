import { NgModule} from '@angular/core';
import { OctDropdownComponent} from './oct.dropdown.component';
import { DropdownModule} from './dropdown.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations  : [
    OctDropdownComponent
  ],
  exports       : [
    OctDropdownComponent
  ],
  imports       : [
    DropdownModule,
    CommonModule
  ]

})

export class OctDropdownModule{

}
