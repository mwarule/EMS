import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowRef } from './services/window-ref';

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
    WindowRef
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    CommonModule
  ]
})
export class CoreModule { }
