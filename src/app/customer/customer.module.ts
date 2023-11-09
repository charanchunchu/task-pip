import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';


@NgModule({
  declarations: [
    CustomerNavbarComponent,
    CustomerDashboardComponent,
    CreateEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
