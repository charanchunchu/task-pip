import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientAuthGuard } from './authGuard/ClientAuthGuard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AddMenuComponent } from './add-menu/add-menu.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuItemComponent },
  {
    path: 'Customer',
    canActivate: [ClientAuthGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
