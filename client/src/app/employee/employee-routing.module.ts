import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
   {
    path: 'create',
    component: CreateEmployeeComponent
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
