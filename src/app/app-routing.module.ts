import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},

  { path: 'admin',
   canActivate:[authGuard],
   loadChildren: 'src/app/admin/admin.module#AdminModule' },

  { path: 'staff',
  canActivate:[authGuard],
   loadChildren: 'src/app/staff/staff.module#StaffModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule{}
