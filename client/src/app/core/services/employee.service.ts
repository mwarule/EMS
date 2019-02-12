import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  create(employee) {
    return this.http.post<Employee[]>(`http://localhost:3000/v1/employees/`, employee)
      .pipe(map(response => {
        return response;
      }));
  }

  findAll() {
    return this.http.get<Employee[]>(`http://localhost:3000/v1/employees/`)
      .pipe(map(response => {
        return response;
      }));
  }

  update(employee) {
    return this.http.put<Employee[]>(`http://localhost:3000/v1/employees/` + employee.id , employee)
      .pipe(map(response => {
        return response;
      }));
  }

  delete(employee) {
    return this.http.delete<Employee[]>(`http://localhost:3000/v1/employees/` + employee.id)
    .pipe(map(response => {
      return response;
    }));
  }
}
