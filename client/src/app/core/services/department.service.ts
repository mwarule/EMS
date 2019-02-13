import { Department } from './../models/department';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { appConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url: string;
  constructor(private http: HttpClient) {
     this.url = appConfig.apiUrl + '/v1/departments/';
   }

   findAll() {
    return this.http.get<Department[]>(this.url)
      .pipe(map(response => {
        return response;
      }));
  }

  findById(departmentId) {
    return this.http.get<Department[]>(this.url + departmentId)
      .pipe(map(response => {
        return response;
      }));
  }
}
