import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../customer-dashboard/customer-dashboard.component';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

employeeData: PeriodicElement;

constructor(private dialogRef: MatDialogRef<ViewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
    this.employeeData = data;
    console.log(this.data);
  }
onClose() {
  this.dialogRef.close();
}
}
