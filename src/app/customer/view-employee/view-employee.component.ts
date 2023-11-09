import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../../dashboard/customer-interface';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

employeeData: any;

constructor(private dialogRef: MatDialogRef<ViewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
    this.employeeData = data;
    console.log(this.employeeData);
  }
onClose() {
  this.dialogRef.close();
}
}
