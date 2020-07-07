import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverPasswordFormComponent } from "./recover-password-form/recover-password-form.component";

const routes: Routes = [
  { path: '', component: RecoverPasswordFormComponent },
  { path: ':accessKey/:urlOrigem/:idCliente', component: RecoverPasswordFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverPasswordRoutingModule { }
