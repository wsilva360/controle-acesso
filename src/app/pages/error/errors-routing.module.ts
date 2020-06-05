import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageNotFoundComponent } from "./error-pagenotfound/error-pagenotfound.component";
import { ErrorInternalServerErrorComponent } from "./error-internalservererror/error-internalservererror.component";

const routes: Routes = [
  { path: '404', component: ErrorPageNotFoundComponent },
  { path: '500', component: ErrorInternalServerErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
