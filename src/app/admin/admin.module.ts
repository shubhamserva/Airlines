import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent, Filter } from './adminComponent/admin.component';
import{updateDialog} from '../../Dialogs/updateDialog';
import{addPessDialog} from '../../Dialogs/addPessDialog';

import {MatToolbarModule,MatDividerModule,MatFormFieldModule,MatSelectModule,
  MatIconModule,MatButtonModule,MatCheckboxModule,
  MatTableModule,MatGridListModule,MatDialogModule,
  MatListModule,MatInputModule,MatCardModule} from '@angular/material'
import { FormsModule } from '@angular/forms';
import { AddService } from 'src/Dialogs/AddServiceDialog';
import { AdminRoutingModule } from './admin.routing.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatTreeModule} from '@angular/material/tree';
import { AddItem } from 'src/Dialogs/addItemDialog';


@NgModule({
  declarations: [AdminComponent,addPessDialog,updateDialog,AddService,Filter,AddItem],
  entryComponents: [addPessDialog,updateDialog,AddService,AddItem],
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
    AdminRoutingModule,
    MatTreeModule
  ]
})
export class AdminModule { }
