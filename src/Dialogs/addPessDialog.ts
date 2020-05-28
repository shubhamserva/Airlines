import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {addPassengerDialog} from '../models/addPassengerDialog'; 
@Component({
    selector: 'addPessDialog',
    templateUrl: './addPessDialog.html',
  })
  export class addPessDialog {
  
    constructor(
      public dialogRef: MatDialogRef<addPessDialog>,
      @Inject(MAT_DIALOG_DATA) public data: addPassengerDialog) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }