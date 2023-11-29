import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientAuthGuard } from './authGuard/ClientAuthGuard';
import { AuthenticateService } from './authGuard/authenticate.service';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { SafeUrlPipe } from './dashboard/safe-url.pipe';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CartService } from './dashboard/cart.service';
import { OrderCheckoutDialogComponent } from './order-checkout-dialog/order-checkout-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    MenuItemComponent,
    AddMenuComponent,
    SafeUrlPipe,
    CartViewComponent,
    OrderCheckoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ],
    providers: [ClientAuthGuard,AuthenticateService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
