import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authGuard/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthenticateService) { }
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
      this.snackBar.open("You have successful login", 'Close', {
        duration: 3000,
      });
    } else {
      sessionStorage.setItem('user_Status', 'error');
      alert("Invalid credentials");
    }
  }
}
