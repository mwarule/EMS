import { Component, OnInit } from '@angular/core';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  cols: any[];
  constructor(private empService: EmployeeService) { }

  ngOnInit() {

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Mobile' }
    ];

    this.getEmployees();
  }

   // get all the app roles
   getEmployees() {
    this.employees = [];
    this.empService.findAll()
      .pipe(first())
      .subscribe(
        response => {
          this.employees = response['data'];
        },
        error => {
          alert(error);
        });
  }

}
