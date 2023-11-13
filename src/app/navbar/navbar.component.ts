import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userStatus: any;
  userRole:any;
  constructor(private router: Router) { }
  ngOnInit() {
    this.userStatus = sessionStorage.getItem('user_Status');
    this.userRole = sessionStorage.getItem('userRole');
  }
  signOut(): void {
    sessionStorage.setItem('user_Status', 'signOut');
    sessionStorage.setItem('userRole', '');
    this.router.navigate(['/']);
  }
}

