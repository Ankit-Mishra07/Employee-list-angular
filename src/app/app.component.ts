import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeformComponent } from './employeeform/employeeform.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
type DataType = {
  employeeName: string;
  email: string;
  department: string;
  designation: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Employee_crud_angular';
  displayedColumns: string[] = [
    'employeeName',
    'email',
    'department',
    'designation',
  ];

  dataSource!: MatTableDataSource<DataType[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(EmployeeformComponent, {
      width: '30%',
    });
  }

  getAllEmployees() {
    const data = localStorage.getItem('employeeList');
    if (data !== null) {
      let newData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
