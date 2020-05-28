import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'AddItem',
    templateUrl: './AddItemDialog.html',
  })
  export class AddItem {
  
    constructor(
      public dialogRef: MatDialogRef<AddItem>,
      @Inject(MAT_DIALOG_DATA) public data) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }