import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeriodicElement } from './customer-interface';
import { ViewEmployeeComponent } from '../customer/view-employee/view-employee.component';
import { CreateEmployeeComponent } from '../customer/create-employee/create-employee.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  clickedRowData: PeriodicElement;
  details: any[] = [];
  employees: any[] = [];
  public userRole;
  filteredDetails: any[] = [];
  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
  console.log(this.userRole);
  this.candidate_details();
  }

  candidate_details() {
    const candidateDetails = localStorage.getItem('candidateDetails');
    if (candidateDetails) {
      this.details = JSON.parse(candidateDetails);
    } else {
      this.details = [];
    }
  }
  displayedColumns: string[] = ['S.NO', 'Name', 'Email', 'Mobile', 'EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate', 'TaskEndDate', 'icon', 'edit', 'delete'];


  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '60%',
      width: '50%',
    disableClose : true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.details = JSON.parse(localStorage.getItem('candidateDetails'));
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!filterValue || filterValue === '') {
      this.details = JSON.parse(localStorage.getItem('candidateDetails'));
    } else {
      this.details = this.details.filter((item) => {
        return (
          item.Name.toLowerCase().includes(filterValue) ||
          item.Email.toLowerCase().includes(filterValue) ||
          item.Mobile.toString().includes(filterValue)
        );
      });
    }
  }

  viewEmployee(row: PeriodicElement) {
    this.clickedRowData = row;
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: this.clickedRowData
    });
    dialogRef.afterClosed().subscribe(() => {
      this.clickedRowData = null;
    });
  }
  getUserRole() {
    const userRole = sessionStorage.getItem('userRole');
    return userRole;
  }

  editEmployee(row: PeriodicElement) {
    if (this.userRole == "admin") {
      this.clickedRowData = row;
      const data = JSON.parse(localStorage.getItem('candidateDetails'));
      const index = data.findIndex(item => item["Id"] === this.clickedRowData["Id"]);
      let dialogRef = this.dialog.open(CreateEmployeeComponent, {
        height: '60%',
        width: '50%',
        disableClose : true,
        data: data[index]

      });

      dialogRef.afterClosed().subscribe(() => {
        this.details = JSON.parse(localStorage.getItem('candidateDetails'));
      });
    }
    else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }

  deleteEmployee(row: PeriodicElement) {
    if (this.userRole == "admin") {
      this.clickedRowData = row;
      const data = JSON.parse(localStorage.getItem('candidateDetails'));
      const index = data.findIndex(item => item["Id"] === this.clickedRowData["Id"]);
      if (index !== -1) {
        data.splice(index, 1);
        localStorage.setItem('candidateDetails', JSON.stringify(data));
        this.details = JSON.parse(localStorage.getItem('candidateDetails'));
      }
    } else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }

}


