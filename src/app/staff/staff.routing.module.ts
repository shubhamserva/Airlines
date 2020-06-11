
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';
import { StaffPageComponent } from './staff-page/staff-page.component';


export const routes: Routes = [
  { path: '',
    component: StaffPageComponent
  },
  {
    path: 'checkIn',
    component: CheckInComponent
  },
  {
    path: 'InFlight',
    component: InFlightComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class staffRoutingModule { }
