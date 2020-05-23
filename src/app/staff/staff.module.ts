import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InFlightComponent } from './in-flight/in-flight.component';
import { CheckInComponent, Filter } from './check-in/check-in.component';
import { staffRoutingModule } from './staff.routing.module';
import {MatToolbarModule,MatDividerModule,MatFormFieldModule,MatSelectModule,
  MatIconModule,MatButtonModule,MatCheckboxModule,
  MatTableModule,MatGridListModule,MatDialogModule,
  MatListModule,MatInputModule,MatCardModule} from '@angular/material'
import { FormsModule } from '@angular/forms';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { changeSeat } from 'src/Dialogs/changeSeat';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [InFlightComponent, CheckInComponent,StaffPageComponent,AddShopItem,changeSeat,Filter],
  entryComponents: [AddShopItem,changeSeat],
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
    MatChipsModule
  ]
})
export class StaffModule { }
