import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterPipe} from "../../../common/display.name";
import { SelectDropDownComponent } from "./components/ngx-select-dropdown-component/ngx-select-dropdown.component";

@NgModule({
  declarations: [SelectDropDownComponent, FilterPipe],
  imports: [CommonModule, FormsModule, MatCheckboxModule],
  exports: [SelectDropDownComponent],
  providers: [],
  bootstrap: []
})
export class SelectDropDownModule {}
