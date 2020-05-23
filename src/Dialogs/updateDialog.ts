import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {updatePassengerDialog} from '../models/updatePassengerDialog';
@Component({
    selector: 'updateDialog',
    templateUrl: './updateDialog.html',
  })
  export class updateDialog {
  
    constructor(
      public dialogRef1: MatDialogRef<updateDialog>,
      @Inject(MAT_DIALOG_DATA) public data: updatePassengerDialog) { }
  
    onNoClick(): void {
      this.dialogRef1.close();
    }
  
  }