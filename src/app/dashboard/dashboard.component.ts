import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeriodicElement } from './customer-interface';
import { ViewEmployeeComponent } from '../customer/view-employee/view-employee.component';
import { CreateEmployeeComponent } from '../customer/create-employee/create-employee.component';
import { ServiceService } from '../service/service.service';

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
  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar, private service: ServiceService) { }
  ngOnInit() {
    this.userRole = sessionStorage.getItem('userRole');
    console.log(this.userRole);
    this.getMenuItems();
  }
  getMenuItems() {
    this.service.getMenuItems().subscribe(
      (data: any[]) => {
        this.details = data.map(item => {
          return {
            ...item,
            fileInputControl: this.sanitizeImagePath(item.fileInputControl),
          };
        });
      },
      (error) => {
        console.error('Error getting menu items:', error);
      }
    );
  }
  candidate_details() {
    const candidateDetails = localStorage.getItem('candidateDetails');
    if (candidateDetails) {
      this.details = JSON.parse(candidateDetails);
    } else {
      this.details = [];
    }
  }
  // displayedColumns: string[] = ['S.NO', 'Image', 'Name', 'Email', 'Mobile', 'EmployeeActivateDate', 'EmployeeDOB', 'TaskId', 'TaskStartDate', 'TaskEndDate', 'icon', 'edit', 'delete'];
  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '60%',
      width: '50%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getMenuItems();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!filterValue || filterValue === '') {
      this.getMenuItems();
    } else {
      this.details = this.details.filter((item) => {
        const concatenatedValues = Object.values(item)
          .filter(value => typeof value === 'string' || typeof value === 'number')
          .map(value => value.toString().toLowerCase())
          .join(' ');

        return concatenatedValues.includes(filterValue);
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
    if (this.userRole === "admin") {
      let dialogRef = this.dialog.open(CreateEmployeeComponent, {
        height: '60%',
        width: '50%',
        disableClose: true,
        data: row
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getMenuItems();
      });
    } else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }
  deleteEmployee(row: any) {
    if (this.userRole === 'admin') {
      this.service.deleteMenuItem(row['id']).subscribe(
        () => {
          this.getMenuItems();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      this.snackBar.open("You don't have admin permissions", 'Close', {
        duration: 3000,
      });
    }
  }
  sanitizeImagePath(path: string): string {
    if (!path) {
      return path;
    }
    if (path.startsWith('C:\\fakepath\\')) {
      const fileExtension = path.split('.').pop().toLowerCase();
      if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(fileExtension)) {
        const imageUrl = `assets/images/${path.replace('C:\\fakepath\\', '')}`;
        console.log('Generated Image URL:', imageUrl);
        return imageUrl;
      }
    } else if (path.startsWith('http')) {
      return path;
    }
    console.warn('Unrecognized file path format:', path);
    return path;
  }
  changeColor(type:any){
    if(type==="veg"){
      return true
    }else{
      return false
    }
  }
}
