import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userStatus: any
  constructor(private router: Router) {}
  ngOnInit(){
    this.userStatus=sessionStorage.getItem('user_Status');
    console.log(this.userStatus);

  }
  signOut(): void {
    sessionStorage.setItem('user_Status', 'sigout');
    sessionStorage.setItem('userRole', '');
    this.router.navigate(['/']);
  }
}

