import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'changeSeat',
    templateUrl: './changeSeat.html',
  })
  export class changeSeat {
  
    constructor(
      public dialogRef: MatDialogRef<changeSeat>,
      @Inject(MAT_DIALOG_DATA) public data) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }