import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent, Filter } from './adminComponent/admin.component';
import {UpdateDialog} from '../../Dialogs/updateDialog';
import {AddPessDialog} from '../../Dialogs/addPessDialog';
import {MatToolbarModule, MatDividerModule, MatFormFieldModule, MatSelectModule,
  MatIconModule, MatButtonModule, MatCheckboxModule,
  MatTableModule, MatGridListModule, MatDialogModule,
  MatListModule, MatInputModule, MatCardModule, MatRadioModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddService } from 'src/Dialogs/AddServiceDialog';
import { AdminRoutingModule } from './admin.routing.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatTreeModule} from '@angular/material/tree';
import { AddItem } from 'src/Dialogs/addItemDialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, AddPessDialog, UpdateDialog, AddService, Filter, AddItem],
  entryComponents: [AddPessDialog, UpdateDialog, AddService, AddItem],
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
    MatTreeModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
