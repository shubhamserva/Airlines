import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'AddService',
    templateUrl: './AddService.html',
  })
  export class AddService {
  
    constructor(
      public dialogRef: MatDialogRef<AddService>,
      @Inject(MAT_DIALOG_DATA) public data) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }