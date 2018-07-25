import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RunHabitualService} from './run.habitual.service';


@Component({
  selector: 'fuse-add-run-dialog',
  templateUrl: './add.run.dialog.html',
  styleUrls: ['create.dialog.component.scss']
})
export class AddRunComponent implements OnInit{
  runName = new FormControl('', [Validators.required]);
  baseName = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  defaultDate: any = new Date();
  addRunData = {baseName: '', runName: '', date: this.defaultDate};
  error = false;
  baseNames: Array<any> = [];
  constructor(
    public dialogRef: MatDialogRef<AddRunComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private runHabitualService: RunHabitualService) {
    this.addRunData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void{
    if (this.addRunData.baseName && this.addRunData.baseName){
      this.dialogRef.close(this.addRunData);
    }else{
      this.error = true;
    }

  }

  ngOnInit(){
    this.baseNames = [];

    this.runHabitualService.getBases().subscribe(response => {

      if (response.status === 404 || response.status === 500 ){
        this.baseNames = [];
      }else {
          this.baseNames = response.json().payload;
      }
    });
  }

}
