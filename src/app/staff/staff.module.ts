import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InFlightComponent } from './in-flight/in-flight.component';
import { CheckInComponent, Filter } from './check-in/check-in.component';
import { staffRoutingModule } from './staff.routing.module';
import {MatToolbarModule, MatDividerModule, MatFormFieldModule, MatSelectModule,
  MatIconModule, MatButtonModule, MatCheckboxModule,
  MatTableModule, MatGridListModule, MatDialogModule,
  MatListModule, MatInputModule, MatCardModule, MatFormField, MatTabsModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { ChangeSeat } from 'src/Dialogs/changeSeat';
import {MatChipsModule} from '@angular/material/chips';
import { UpdateMeal } from 'src/Dialogs/updateMeal';
import { UpdateService } from 'src/Dialogs/updateServiceDialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [InFlightComponent, CheckInComponent, StaffPageComponent,
                  AddShopItem, ChangeSeat, Filter, UpdateMeal, UpdateService],
  entryComponents: [AddShopItem, ChangeSeat, UpdateMeal, UpdateService],
  imports: [
    CommonModule,
    staffRoutingModule,
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
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class StaffModule { }
