import { Component, Inject} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    templateUrl: 'delete.confirmation.html',
    styleUrls: ['delete.confirmation.scss']
})

export class DeleteConfirmation{
    constructor(public dialogRef: MatDialogRef<DeleteConfirmation>, @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirm(){
        this.dialogRef.close(this.data);
    }
}
