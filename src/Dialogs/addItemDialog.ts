import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
   // selector: 'AddItem',
    templateUrl: './AddItemDialog.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class AddItem {

    constructor(
      public dialogRef: MatDialogRef<AddItem>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
