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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ToolbarModule,
    SharedRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [
    CommonModule,
    SharedRoutingModule,
    DialogModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ToolbarModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
