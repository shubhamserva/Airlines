import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-addservice',
    templateUrl: './AddService.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class AddService {

    constructor(
      public dialogRef: MatDialogRef<AddService>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
