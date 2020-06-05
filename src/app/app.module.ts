import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";

import { AuthUser } from './shared/authentication/auth-user.model';
import { BasicAuthHtppInterceptorService } from './shared/authentication/auth-http-interceptor.service';
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
    AuthLoginService, 
    AuthGuardService, 
    ConfirmationService,
    {  
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true 
    }, 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
