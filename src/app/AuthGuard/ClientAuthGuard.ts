import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticateService) { }

  canActivate(): boolean {
    const username = 'admin';
    const password = 'admin';

    const isClientAuthenticated: boolean = this.authService.checkClientAuthentication(username, password);

    if (!isClientAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticateService) { }

  canActivate(): boolean {
    const username = 'customer';
    const password = 'customer';

    const isCustomerAuthenticated: boolean = this.authService.checkClientAuthentication(username, password);

    if (!isCustomerAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
