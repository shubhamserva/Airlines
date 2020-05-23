import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent, Filter } from './adminComponent/admin.component';
import{updateDialog} from '../../Dialogs/updateDialog';
import{customDialog} from '../../Dialogs/customDialog';

import {MatToolbarModule,MatDividerModule,MatFormFieldModule,MatSelectModule,
  MatIconModule,MatButtonModule,MatCheckboxModule,
  MatTableModule,MatGridListModule,MatDialogModule,
  MatListModule,MatInputModule,MatCardModule} from '@angular/material'
import { FormsModule } from '@angular/forms';
import { AddService } from 'src/Dialogs/AddServiceDialog';
import { AdminRoutingModule } from './admin.routing.module';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [AdminComponent,customDialog,updateDialog,AddService,Filter],
  entryComponents: [customDialog,updateDialog,AddService],
  imports: [
    CommonModule,
    MatChipsModule,
    MatToolbarModule,
    MatDividerModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
