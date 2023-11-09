import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit{
  employeeForm: FormGroup;
  employees:any[]=[];
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar) {
    this.employeeForm = this.fb.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      EmployeeActivateDate: ['', Validators.required],
      EmployeeDOB: ['', Validators.required],
      TaskId: ['', Validators.required],
      TaskStartDate: ['', Validators.required],
      TaskEndDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('candidateDetails'));
  }
  onSubmit() {
      this.employees.push(this.employeeForm.value);
      localStorage.setItem('candidateDetails', JSON.stringify(this.employees));
      this.snackBar.open('candidateDetails Add successfully!', 'Close', {
        duration: 3000,
      });
  }
}
