import { NgModule} from '@angular/core';
import { SearchableDropdownComponent, DropSearchFilterPipe} from "./searchable.dropdown.component";
import { FormsModule} from '@angular/forms';
import { CommonModule} from "@angular/common";


@NgModule({
    exports: [SearchableDropdownComponent],
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [SearchableDropdownComponent,DropSearchFilterPipe]


})

export class SearchableDropdownModule{}
