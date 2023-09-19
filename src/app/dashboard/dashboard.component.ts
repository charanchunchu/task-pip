import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  ID: number;
  NAME: string;
  EMAIL: string;
  MOBILE: string;
  EmployeeActivateDate: Date;
  EmployeeDOB: Date;
  TaskId: number;
  TaskStartDate: Date;
  TaskEndDate: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  details:any[]=[];
  employees:any[]=[];
  filteredDetails: any[] = [];
    constructor(private http: HttpClient,public dialog: MatDialog,private _snackBar: MatSnackBar) {
  }
ngOnInit() {
    this.candidate_details();
  }

  candidate_details() {
    this.http.get<any[]>('../../assets/json/details.json').subscribe((data:any) => {
      this.details = data;
      localStorage.setItem('canidateDetails',JSON.stringify(data));
    });
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile','EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate','TaskEndDate','icon'];


  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '58%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(()=>{
      console.log('close event');
      this.details = JSON.parse(localStorage.getItem('canidateDetails'));
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.details = this.details.filter((item) => {
      return (
        item.Name.toLowerCase().includes(filterValue) ||
        item.Email.toLowerCase().includes(filterValue) ||
        item.Mobile.includes(filterValue)
      );
    });
  }
}

