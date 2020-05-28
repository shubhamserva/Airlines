import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'updateMeal',
    templateUrl: './updateMeal.html',
  })
  export class updateMeal {
  
    constructor(
      public dialogRef: MatDialogRef<updateMeal>,
      @Inject(MAT_DIALOG_DATA) public data) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }