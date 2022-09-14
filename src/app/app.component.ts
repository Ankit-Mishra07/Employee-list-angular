import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeformComponent } from './employeeform/employeeform.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Employee_crud_angular';
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(EmployeeformComponent, {
      width: '30%',
    });
  }
}
