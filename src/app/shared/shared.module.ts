import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerMessagesComponent } from './components/server-messages/server-messages.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LightboxModule } from 'primeng/lightbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerMessagesComponent,
    ServerErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //DataTablesModule,
    PasswordModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    LightboxModule
  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //DataTablesModule,
    PasswordModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    LightboxModule,

    // shared components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerMessagesComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
