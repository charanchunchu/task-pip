import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/dashboard/customer-interface';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];
  isEditForm: boolean = false;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,public dialogRef: MatDialogRef<CreateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
    this.employeeForm = this.fb.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]],
      Mobile: ['', [Validators.required,  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      EmployeeActivateDate: ['', Validators.required],
      EmployeeDOB: ['', Validators.required],
      TaskId: ['', Validators.required],
      TaskStartDate: ['', Validators.required],
      TaskEndDate: ['', Validators.required],
    });
    if (data != null) {
      this.isEditForm = true;
      this.employeeForm.patchValue({
        Id: data["Id"], Name: data["Name"],
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
    const storedEmployees = JSON.parse(localStorage.getItem('candidateDetails'));
    this.employees = storedEmployees || [];
  }

  onSubmit() {
    console.log(this.employeeForm.valid);
    if(this.employeeForm.valid){
    if (!this.employeeForm.value["Id"]) {
      this.employeeForm.patchValue({ "Id": uuid() });
    }
    const updatedEmployee = this.employeeForm.value;

    if (!this.employees) {
      this.employees = [];
    }

    const index = this.employees.findIndex(item => item && item["Id"] === updatedEmployee["Id"]);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.showMessage('candidateDetails update successfully!');
    } else {
      this.employees.push(updatedEmployee);
      this.showMessage('candidateDetails Add successfully!');
    }
    localStorage.setItem('candidateDetails', JSON.stringify(this.employees));
    this.close();
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
