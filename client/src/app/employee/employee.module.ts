import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [EmployeeListComponent, CreateEmployeeComponent, EditEmployeeComponent]
})
export class EmployeeModule { }
