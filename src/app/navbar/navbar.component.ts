import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userStatus: any;
  userRole:any;
  constructor(private router: Router,private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.userStatus = sessionStorage.getItem('user_Status');
    this.userRole = sessionStorage.getItem('userRole');
  }
  signOut(): void {
    sessionStorage.setItem('user_Status', 'signOut');
    sessionStorage.setItem('userRole', '');
    this.router.navigate(['/']);
    this.snackBar.open("You have successful logout", 'Close', {
      duration: 3000,
    });
  }
}

