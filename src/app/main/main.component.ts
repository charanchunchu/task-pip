import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private router: Router,public dialog: MatDialog) { }
order(){
  let dialogRef = this.dialog.open(LoginComponent, {
    // disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
  });}
}
