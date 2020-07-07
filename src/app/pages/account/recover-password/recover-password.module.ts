import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordFormComponent } from './recover-password-form/recover-password-form.component';

import { InputMaskModule } from 'primeng/inputmask';
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [RecoverPasswordFormComponent],
  imports: [
    SharedModule,
    RecoverPasswordRoutingModule,

    InputMaskModule,
    IMaskModule,
    TextMaskModule
  ]
})
export class RecoverPasswordModule { }
