import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/dashboard/customer-interface';
import { ServiceService } from 'src/app/service/service.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
   imageUrl: string | ArrayBuffer | null = null;
  employeeForm: FormGroup;
  employees: any[] = [];
  isEditForm: boolean = false;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: PeriodicElement, private service: ServiceService) {
    this.employeeForm = this.fb.group({
      profileImage: [''],
      fileInputControl: [''],
      id: [''],
      Title: ['', Validators.required],
      Item: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Calories: ['', Validators.required],
      Type: ['', Validators.required],
    });
    if (data != null) {
      this.isEditForm = true;
      this.employeeForm.patchValue({
        id: data["id"], Title: data["Title"],
        Item: data["Item"],
        Price: data["Price"],
        Description: data["Description"],
        Calories: data["Calories"],
        Type: data["Type"],
        fileInputControl: data["fileInputControl"],
      })
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditForm = true;
      this.imageUrl = this.data.fileInputControl;
      this.employeeForm.patchValue({
        Id: this.data["id"],
        Title: this.data["Title"],
        Item: this.data["Item"],
        Price: this.data["Price"],
        Description: this.data["Description"],
        Calories: this.data["Calories"],
        Type: this.data["Type"],
        fileInputControl: this.data.fileInputControl,
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);

      this.employeeForm.patchValue({
        profileImage: file,
        fileInputControl: file.name,
      });
    }
  }


resetFileInput() {
  this.imageUrl = null;
  this.employeeForm.get('fileInputControl')?.setValue('');
}
}
