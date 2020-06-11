import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
   // selector: 'AddShop',
    templateUrl: './AddShopItemDialog.html',
  })
  // tslint:disable-next-line:component-class-suffix
  export class AddShopItem {

    constructor(
      public dialogRef: MatDialogRef<AddShopItem>,
      @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
