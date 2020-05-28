import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InFlightComponent } from './in-flight/in-flight.component';
import { CheckInComponent, Filter } from './check-in/check-in.component';
import { staffRoutingModule } from './staff.routing.module';
import {MatToolbarModule,MatDividerModule,MatFormFieldModule,MatSelectModule,
  MatIconModule,MatButtonModule,MatCheckboxModule,
  MatTableModule,MatGridListModule,MatDialogModule,
  MatListModule,MatInputModule,MatCardModule,MatFormField} from '@angular/material'
import { FormsModule } from '@angular/forms';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { changeSeat } from 'src/Dialogs/changeSeat';
import {MatChipsModule} from '@angular/material/chips';
import { updateMeal } from 'src/Dialogs/updateMeal';
import { UpdateService } from 'src/Dialogs/updateServiceDialog';


@NgModule({
  declarations: [InFlightComponent, CheckInComponent,StaffPageComponent,
                  AddShopItem,changeSeat,Filter,updateMeal,UpdateService],
  entryComponents: [AddShopItem,changeSeat,updateMeal,UpdateService],
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
  ]
})
export class StaffModule { }
