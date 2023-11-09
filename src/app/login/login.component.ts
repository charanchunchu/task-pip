import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticateService } from '../AuthGuard/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthenticateService) {}
  username: string = '';
  password: string = '';
  ngOnInit() {
  }
  login(): void {
    const isAuthenticated: boolean = this.authService.checkClientAuthentication(this.username, this.password);
    if (isAuthenticated) {
      sessionStorage.setItem('user_Status', 'signin');
      sessionStorage.setItem('userRole', this.username);
      this.router.navigate(['dashboard']);
      // if (this.username === 'admin') {
      //   this.router.navigate(['admin']);
      //   sessionStorage.setItem('userRole', 'admin');
      // } else if (this.username === 'customer') {
      //   this.router.navigate(['Customer']);
      //   sessionStorage.setItem('userRole', 'Customer');
      // }
      // this.dialogRef.close();
    } else {
      sessionStorage.setItem('user_Status', 'error');
      alert("Invalid credentials");
    }
  }
}
