import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    // selector: 'updateMeal',
    templateUrl: './updateMeal.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class UpdateMeal {

    constructor(
      public dialogRef: MatDialogRef<UpdateMeal>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
