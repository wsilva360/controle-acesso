import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorPageNotFoundComponent } from './error-pagenotfound/error-pagenotfound.component';
import { ErrorInternalServerErrorComponent } from './error-internalservererror/error-internalservererror.component';

@NgModule({
  declarations: [ErrorPageNotFoundComponent, ErrorInternalServerErrorComponent],
  imports: [
    SharedModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
