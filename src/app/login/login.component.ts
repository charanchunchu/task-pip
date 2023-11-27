import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authGuard/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  confirmPassword: string = '';
  isSignup: boolean = false;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private service: ServiceService
  ) {}

  username: string = '';
  password: string = '';

  ngOnInit() {}

  async login(): Promise<void> {
    try {
      const isAuthenticated: boolean = await this.authService.checkClientAuthentication(this.username, this.password).toPromise();

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
    } catch (error) {
    }
  }


  switchForm(isSignup: boolean): void {
    this.isSignup = isSignup;
  }
  signup(): void {
    this.service.registerUser(this.username, this.password).subscribe(
      (response) => {
        this.snackBar.open('User registered successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      },
      (error) => {
        this.snackBar.open('Error registering user', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
