import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {addPassengerDialog} from '../models/addPassengerDialog';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
   // selector: 'addPessDialog',
    templateUrl: './addPessDialog.html',
  })

  // tslint:disable-next-line:component-class-suffix
  export class AddPessDialog {

    constructor(
      public dialogRef: MatDialogRef<AddPessDialog>,
      @Inject(MAT_DIALOG_DATA) public data: addPassengerDialog) { }

      passengerForm = new FormGroup({
        name: new FormControl(''),
        PNR: new FormControl(''),
        passport: new FormControl(''),
        infant: new FormControl(''),
        wheelchair: new FormControl('')
      });


    onNoClick(): void {
      this.dialogRef.close();
    }


  }
