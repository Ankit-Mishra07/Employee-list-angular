import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.scss'],
})
export class EmployeeformComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeformComponent>
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      email: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  addProduct() {
    if (
      this.employeeForm.value.employeeName === '' ||
      this.employeeForm.value.email === '' ||
      this.employeeForm.value.department === '' ||
      this.employeeForm.value.designation === ''
    ) {
      return;
    }
    let data = localStorage.getItem('employeeList');
    if (data === null) {
      let newData = [];
      newData.push(this.employeeForm.value);
      localStorage.setItem('employeeList', JSON.stringify(newData));
    } else {
      const newData = JSON.parse(data);
      newData.push(this.employeeForm.value);
      localStorage.setItem('employeeList', JSON.stringify(newData));
    }
    this.employeeForm.reset();
    this.dialogRef.close('save');
  }
}
