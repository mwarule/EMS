import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { appConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string;
  constructor(private http: HttpClient) {
     this.url = appConfig.apiUrl + '/v1/employees/';
   }

  /**
  * Creates an employee
  * @param employee
  */
  create(employee) {
    return this.http.post<Employee[]>(this.url, employee)
      .pipe(map(response => {
        return response;
      }));
  }

  /**
  * Gets all employees
  */
  findAll() {
    return this.http.get<Employee[]>(this.url)
      .pipe(map(response => {
        return response;
      }));
  }

  /**
  * Finds an employee by id
  * @param employeeId
  */
  findById(employeeId) {
    return this.http.get<Employee[]>(this.url + employeeId)
      .pipe(map(response => {
        return response;
      }));
  }

  /**
  * Updates an employee by id
  * @param employee
  */
  update(employee) {
    return this.http.put<Employee[]>(this.url + employee.id , employee)
      .pipe(map(response => {
        return response;
      }));
  }

  /**
  * Deletes an employee by id
  * @param empId
  */
  delete(empId) {
    return this.http.delete<Employee[]>(this.url + empId)
    .pipe(map(response => {
      return response;
    }));
  }
}
