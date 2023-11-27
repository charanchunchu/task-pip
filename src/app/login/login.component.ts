import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authGuard/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isForgotPassword: boolean = false;
  isSignup: boolean = false;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  username: string = '';
  password: string = '';
  email: string = '';

  ngOnInit() {}

  login(): void {
    if (!this.isForgotPassword) {
      const isAuthenticated: boolean = this.authService.checkClientAuthentication(this.username, this.password);
      if (isAuthenticated) {
        sessionStorage.setItem('user_Status', 'signin');
        sessionStorage.setItem('userRole', this.username);
        this.router.navigate(['dashboard']);
        this.snackBar.open('You have successfully logged in', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      } else {
        sessionStorage.setItem('user_Status', 'error');
        alert('Invalid credentials');
      }
    } else {
      this.sendOTP();
    }
  }
sendOTP(): void {}
toggleForgotPassword(): void {
  this.isForgotPassword = !this.isForgotPassword;
}
  switchForm(isSignup: boolean): void {
    this.isSignup = isSignup;
  }
}
