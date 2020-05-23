import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {addPassengerDialog} from '../models/addPassengerDialog'; 
@Component({
    selector: 'customDialog',
    templateUrl: './customDialog.html',
  })
  export class customDialog {
  
    constructor(
      public dialogRef: MatDialogRef<customDialog>,
      @Inject(MAT_DIALOG_DATA) public data: addPassengerDialog) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }