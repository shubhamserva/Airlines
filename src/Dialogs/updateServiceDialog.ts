import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addServicesDialog } from 'src/models/addServicesDialog';
@Component({
   // selector: 'UpdateService',
    templateUrl: './updateService.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class UpdateService {

    constructor(
      public dialogRef: MatDialogRef<UpdateService>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
