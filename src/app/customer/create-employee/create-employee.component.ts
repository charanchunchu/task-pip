import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/dashboard/customer-interface';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit{
  employeeForm: FormGroup;
  employees:any[]=[];
  isEditForm:boolean=false;
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
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
    if(data != null){
      this.isEditForm = true;
      console.log("data",data);
      this.employeeForm.patchValue({id: data["Id"], Name: data["Name"],
      Email: data["Email"],
      Mobile: data["Mobile"],
      EmployeeActivateDate: data["EmployeeActivateDate"],
      EmployeeDOB: data["EmployeeDOB"],
      TaskId: data["TaskId"],
      TaskStartDate: data["TaskStartDate"],
      TaskEndDate: data["TaskEndDate"],})
    }
  }

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('candidateDetails'));
  }
  onSubmit() {
    if(!("Id" in this.employeeForm.value)){
    this.employeeForm.value["Id"] = uuid();
    }
    const index = this.employees.findIndex(item => item["Id"] === this.employeeForm.value["Id"]);
    console.log("index",index);
    console.log("index",this.employees);
    if(index !==-1){
      this.employees[index]=this.employeeForm.value;
    }else{
      this.employees.push(this.employeeForm.value);
    }
      localStorage.setItem('candidateDetails', JSON.stringify(this.employees));
      this.snackBar.open('candidateDetails Add successfully!', 'Close', {
        duration: 3000,
      });
  }
}
