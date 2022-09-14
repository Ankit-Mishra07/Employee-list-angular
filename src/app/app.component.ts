import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeformComponent } from './employeeform/employeeform.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Employee_crud_angular';
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  openDialog() {
    this.dialog.open(EmployeeformComponent, {
      width: '30%',
    });
  }

  getAllEmployees() {
    const data = localStorage.getItem('employeeList');
    if (data !== null) {
      console.log(JSON.parse(data));
      return JSON.parse(data);
    } else {
      return [];
    }
  }
}
