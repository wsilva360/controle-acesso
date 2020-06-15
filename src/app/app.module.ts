import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";

import { AuthUser } from './shared/authentication/auth-user.model';
import { BasicAuthHtppInterceptorService } from './shared/authentication/auth-http-interceptor.service';
import { ErrorInterceptor } from './shared/authentication/auth-error-http-interceptor.service';
import { AuthLoginService } from './shared/authentication/auth-login.service';
import { AuthGuardService } from './shared/authentication/auth-guard.service';

import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [
    DialogModule,
    ConfirmDialogModule,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [
    // Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    // Authnetication
    AuthLoginService, 
    AuthGuardService, 
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
