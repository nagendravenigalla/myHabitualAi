// chart.component.ts
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router} from '@angular/router';


@Component({
  selector: 'fuse-create-dialog',
  templateUrl: 'create.dialog.component.html',
  styleUrls  : ['create.dialog.component.scss']
})
export class CreateDialogComponent {


  animal: string;
  name: string;

  constructor(public dialog: MatDialog, public router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result ){
        this.router.navigate(['/create-chart']);
      }
    });
  }

}

@Component({
  selector: 'fuse-dialog-overview-example-dialog',
  templateUrl: './create.dashboard.dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
