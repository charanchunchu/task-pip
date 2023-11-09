import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticateService {
  private credentials: { [key: string]: string } = {
    admin: 'admin',
    customer: 'customer'
  };

  checkClientAuthentication(username: string, password: string): boolean {
    return this.credentials[username] === password;
  }
}
