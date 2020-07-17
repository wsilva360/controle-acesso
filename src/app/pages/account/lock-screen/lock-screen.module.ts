import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";

import { LockScreenRoutingModule } from './lock-screen-routing.module';
import { LockScreenFormComponent } from './lock-screen-form/lock-screen-form.component';

import { InputMaskModule } from 'primeng/inputmask';
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [LockScreenFormComponent],
  imports: [
    SharedModule,
    LockScreenRoutingModule,

    InputMaskModule,
    IMaskModule,
    TextMaskModule
  ]
})
export class LockScreenModule { }
