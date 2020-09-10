import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";

import { LoginRoutingModule } from './login-routing.module';
import { LoginListComponent } from './login-list/login-list.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { InputMaskModule } from 'primeng/inputmask';
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [LoginListComponent, LoginFormComponent],
  imports: [
    SharedModule,
    LoginRoutingModule,
    ProgressSpinnerModule,
    InputMaskModule,
    IMaskModule,
    TextMaskModule,

  ]
})
export class LoginModule { }
