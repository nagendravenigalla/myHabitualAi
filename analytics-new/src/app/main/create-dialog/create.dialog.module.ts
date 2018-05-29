import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateDialogComponent, DialogOverviewExampleDialogComponent} from './create.dialog.component';
import { DialogButtonComponent} from './dialog.button.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    CreateDialogComponent,
    DialogOverviewExampleDialogComponent,
    DialogButtonComponent
  ],
  imports:      [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports:      [
    CreateDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent]
})
export class CreateDialogModule
{
}
