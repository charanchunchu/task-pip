import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticateService) { }

  async canActivate(): Promise<boolean> {
    const username = 'admin';
    const password = 'admin';

    const isClientAuthenticated: boolean = await this.authService.checkClientAuthentication(username, password).toPromise();

    if (!isClientAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
