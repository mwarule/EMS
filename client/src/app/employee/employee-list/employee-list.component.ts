import { Component, OnInit } from '@angular/core';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { first } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: []
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  cols: any[];
  message: string;
  constructor(private empService: EmployeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'mobile', header: 'Mobile' }
    ];

    this.getEmployees();
  }

  /**
  * Gets employees data
  */
  getEmployees() {
    this.employees = [];
    this.empService.findAll()
      .pipe(first())
      .subscribe(
      response => {
        this.employees = response['data'];
        if(this.employees.length === 0){
          this.message = "No Employees found";
        }
      },
      error => {
        console.log(error);
      });
  }

  /**
  * Confirms employee deletion
  * @param employee
  */
  confirmEmployeeDeletion(employee) {
    const empId = employee.id;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this employee ?',
      header: 'Delete Employee',
      icon: 'fa fa-exclamation-triangle',
      accept: () => {
        this.deleteEmployee(empId);
      },
      reject: () => {
      }
    });
  }

  /**
  * Deletes an employee
  * @param empId
  */
  deleteEmployee(empId) {
    this.messageService.clear();
    this.empService.delete(empId)
      .pipe(first())
      .subscribe(
      response => {
        const data = response['data'];
        const success = response['success'];
        if (success && data) {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Employee deleted successfully' });
        }
        this.getEmployees();
      },
      error => {
        console.log(error);
      });
  }

}
