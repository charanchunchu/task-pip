import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientAuthGuard } from './AuthGuard/ClientAuthGuard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'Customer',
    canActivate: [ClientAuthGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  // {
  //   path: 'admin',
  //   canActivate: [ClientAuthGuard],
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
