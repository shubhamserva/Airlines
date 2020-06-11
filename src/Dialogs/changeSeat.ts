import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    // selector: 'changeSeat',
    templateUrl: './changeSeat.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class ChangeSeat {

    constructor(
      public dialogRef: MatDialogRef<ChangeSeat>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
