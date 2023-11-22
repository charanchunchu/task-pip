import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/dashboard/customer-interface';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];
  isEditForm: boolean = false;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: PeriodicElement, private service: ServiceService) {
    this.employeeForm = this.fb.group({
      id: [''],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]],
      Mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      EmployeeActivateDate: ['', Validators.required],
      EmployeeDOB: ['', Validators.required],
      TaskId: ['', Validators.required],
      TaskStartDate: ['', Validators.required],
      TaskEndDate: ['', Validators.required],
    });
    if (data != null) {
      this.isEditForm = true;
      this.employeeForm.patchValue({
        id: data["id"], Name: data["Name"],
        Email: data["Email"],
        Mobile: data["Mobile"],
        EmployeeActivateDate: data["EmployeeActivateDate"],
        EmployeeDOB: data["EmployeeDOB"],
        TaskId: data["TaskId"],
        TaskStartDate: data["TaskStartDate"],
        TaskEndDate: data["TaskEndDate"],
      })
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditForm = true;
      this.employeeForm.patchValue({
        Id: this.data["id"],
        Name: this.data["Name"],
        Email: this.data["Email"],
        Mobile: this.data["Mobile"],
        EmployeeActivateDate: this.data["EmployeeActivateDate"],
        EmployeeDOB: this.data["EmployeeDOB"],
        TaskId: this.data["TaskId"],
        TaskStartDate: this.data["TaskStartDate"],
        TaskEndDate: this.data["TaskEndDate"],
      });
    }
    console.log('Received data:', this.data);
    const storedEmployees = JSON.parse(localStorage.getItem('candidateDetails'));
    this.employees = storedEmployees || [];
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      const updatedEmployee = this.employeeForm.value;
      if (this.isEditForm) {
        this.service.updateMenuItem(updatedEmployee.id, updatedEmployee).subscribe(
          (response) => {
            this.showMessage('Employee details updated successfully!');
            this.close();
          },
          (error) => {
            this.showMessage('Error updating employee details.');
          }
        );
      } else {
        this.service.addMenuItem(updatedEmployee).subscribe(
          (response) => {
            this.showMessage('Employee added successfully!');
            this.close();
          },
          (error) => {
            this.showMessage('Error adding employee.');
          }
        );
      }
    }
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  close() {
    this.dialogRef.close();
  }
}
