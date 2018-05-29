import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'fuse-save-dialog',
  templateUrl: './save.dashboard.dialog.component.html',
  styleUrls  : ['event.filter.component.scss']
})
export class SaveDashboardDialogComponent{
  description = new FormControl('', [Validators.required]);
  baseName = new FormControl('', [Validators.required]);
  selectedName = new FormControl('', [Validators.required]);
  dashboard = {baseName: '', description: '', selectedName: ''};
  error = false;
  constructor(
    public dialogRef: MatDialogRef<SaveDashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dashboard.baseName = data.baseName;
      this.dashboard.description = data.description;
      this.dashboard.selectedName = data.dashboardName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void{
    if (this.dashboard.baseName && this.dashboard.description && this.dashboard.selectedName){
      this.dialogRef.close(this.dashboard);
    }else{
      this.error = true;
    }

  }

}
