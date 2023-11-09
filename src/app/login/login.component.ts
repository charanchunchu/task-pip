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
  constructor(private router: Router, public dialogRef: MatDialogRef<LoginComponent>, private authService: AuthenticateService) {}
  username: string = '';
  password: string = '';
  ngOnInit() {
  }
  login(): void {
    const isAuthenticated: boolean = this.authService.checkClientAuthentication(this.username, this.password);
    if (isAuthenticated) {
      if (this.username === 'admin') {
        this.router.navigate(['admin']);
        sessionStorage.setItem('userRole', 'admin');
      } else if (this.username === 'customer') {
        this.router.navigate(['Customer']);
        sessionStorage.setItem('userRole', 'Customer');
      }
      this.dialogRef.close();
    } else {
      alert("Invalid credentials");
    }
  }
}
