import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addServicesDialog } from 'src/models/addServicesDialog';
@Component({
    selector: 'UpdateService',
    templateUrl: './AddService.html',
  })
  export class UpdateService {
  
    constructor(
      public dialogRef: MatDialogRef<UpdateService>,
      @Inject(MAT_DIALOG_DATA) public data:addServicesDialog) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }