import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.scss'],
})
export class EmployeeformComponent implements OnInit {
  employeeForm!: FormGroup;
  actionBtn: String = 'Save';
  Index!: number;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EmployeeformComponent>
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      email: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
    });
    if (this.editData) {
      let AllData = localStorage.getItem('employeeList');
      if (AllData !== null) {
        let getDataIndex = JSON.parse(AllData);
        for (let i = 0; i < getDataIndex.length; i++) {
          if (this.editData.email === getDataIndex[i].email) {
            this.Index = i;
          }
        }
      }
      this.actionBtn = 'Update';
      this.employeeForm.controls['employeeName'].setValue(
        this.editData.employeeName
      );
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['designation'].setValue(
        this.editData.designation
      );
      this.employeeForm.controls['department'].setValue(
        this.editData.department
      );
    }
  }

  addEmployee() {
    if (
      this.employeeForm.value.employeeName === '' ||
      this.employeeForm.value.email === '' ||
      this.employeeForm.value.department === '' ||
      this.employeeForm.value.designation === ''
    ) {
      return;
    }

    if (!this.editData) {
      // Check uniqueness of email
      let AllData = localStorage.getItem('employeeList');
      if (AllData !== null) {
        let searchData = JSON.parse(AllData);
        for (let i = 0; i < searchData.length; i++) {
          if (searchData[i].email === this.employeeForm.value.email) {
            alert('This employee is already exists');
            return;
          }
        }
      }

      //
      let data = localStorage.getItem('employeeList');
      if (data === null) {
        let newData = [];
        newData.push(this.employeeForm.value);
        localStorage.setItem('employeeList', JSON.stringify(newData));
      } else {
        const newData = JSON.parse(data);
        newData.push(this.employeeForm.value);
        localStorage.setItem('employeeList', JSON.stringify(newData));
        alert('Employee data is added');
      }

      this.employeeForm.reset();
      this.dialogRef.close('save');
    } else {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    let AllData = localStorage.getItem('employeeList');
    if (AllData !== null) {
      let searchData = JSON.parse(AllData);
      searchData[this.Index] = this.employeeForm.value;
      localStorage.setItem('employeeList', JSON.stringify(searchData));
      alert('Product is updated successfully');
    }
    this.employeeForm.reset();
    this.dialogRef.close('update');
  }
}
