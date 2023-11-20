import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddLabelComponent } from './components/add-label/add-label.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    FormComponent,
    SidebarComponent,
    AddLabelComponent,
    ContactListComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormComponent,
    SidebarComponent,
    AddLabelComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
