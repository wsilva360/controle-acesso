import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";

import { AuthUser } from './shared/authentication/auth-user.model';
import { AuthLoginService } from './shared/authentication/auth-login.service';
import { AuthGuardService } from './shared/authentication/auth-guard.service';

import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';

import { InputMaskModule } from 'primeng/inputmask';

import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [
    DialogModule,
    ConfirmDialogModule
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    
    DialogModule,
    ConfirmDialogModule,
    InputMaskModule,
    IMaskModule, 
    TextMaskModule
  ],
  providers: [AuthLoginService, AuthGuardService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
