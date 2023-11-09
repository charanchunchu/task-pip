import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import {PeriodicElement} from './customer-interface';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  clickedRowData: PeriodicElement;
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
      localStorage.setItem('candidateDetails',JSON.stringify(data));
    });
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile','EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate','TaskEndDate','icon'];


  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '58%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.details = JSON.parse(localStorage.getItem('candidateDetails'));
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
  viewEmployee(row: PeriodicElement) {
    this.clickedRowData = row;
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      height: '20%',
      width: '50%',
      data: this.clickedRowData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.clickedRowData = null;
    });
  }
}


