import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { NewPasswordFormComponent } from './new-password-form/new-password-form.component';

import { InputMaskModule } from 'primeng/inputmask';
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [NewPasswordFormComponent],
  imports: [
    SharedModule,
    NewPasswordRoutingModule,

    InputMaskModule,
    IMaskModule,
    TextMaskModule
  ]
})
export class NewPasswordModule { }
