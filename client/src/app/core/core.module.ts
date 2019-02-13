import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowRef } from './services/window-ref';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DepartmentService } from './services/department.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreRoutingModule
  ],
  providers: [
    EmployeeService,
    DepartmentService,
    WindowRef,
    ConfirmationService,
    MessageService
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    CommonModule
  ]
})
export class CoreModule { }
