import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DeleteConfirmation} from './delete.confirmation';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    DeleteConfirmation
  ],
  imports     : [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports     : [
      DeleteConfirmation
  ],
    entryComponents:[
        DeleteConfirmation
    ]
})
export class DeleteConfirmModule
{
}
