import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PeriodicElement} from './customer-interface';
import { ViewEmployeeComponent } from '../customer/view-employee/view-employee.component';
import { CreateEmployeeComponent } from '../customer/create-employee/create-employee.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  clickedRowData: PeriodicElement;
  details:any[]=[];
  employees:any[]=[];
  public userRole;
  filteredDetails: any[] = [];
    constructor(private http: HttpClient,public dialog: MatDialog,private _snackBar: MatSnackBar) {
  }
ngOnInit() {
    this.candidate_details();
    this.userRole=sessionStorage.getItem('userRole');
console.log(this.userRole);

  }

  candidate_details() {
    this.http.get<any[]>('../../assets/json/details.json').subscribe((data:any) => {
      this.details = data;
      localStorage.setItem('candidateDetails',JSON.stringify(data));
    });
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile','EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate','TaskEndDate','icon','edit'];


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
  getUserRole(){
  const userRole=sessionStorage.getItem('userRole');
  return userRole;
  }
}


