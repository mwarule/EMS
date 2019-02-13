import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {TableModule} from 'primeng/table';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    MultiSelectModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    ConfirmDialogModule,
    SharedRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [
    CommonModule,
    SharedRoutingModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ToolbarModule,
    CalendarModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
