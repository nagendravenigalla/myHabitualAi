import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'fuse-edit-attribute-dialog',
  templateUrl: './edit.attribute.dialog.html',
  styleUrls: ['edit.attribute.component.scss']
})
export class EditAttributeComponent implements OnInit{
  name = new FormControl('', [Validators.required]);
  displayName = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  isVisible = new FormControl('', [Validators.required]);
  error = false;
  isGroupable = new FormControl('', [Validators.required]);
  editData = {name: '', displayName: '', type: '', isVisible: '', isGroupable: ''};
  constructor(
    public dialogRef: MatDialogRef<EditAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFormSubmit(): void{
    if (this.editData.name && this.editData.displayName && this.editData.type && (this.editData.isVisible !== null && this.editData.isVisible !== undefined)){
      this.dialogRef.close(this.editData);
    }else{
      this.error = true;
    }

  }

  ngOnInit(){

    /*this.runHabiutalService.getBases().subscribe(response => {
      this.baseNames = response.json().data;
    });*/
  }

}
