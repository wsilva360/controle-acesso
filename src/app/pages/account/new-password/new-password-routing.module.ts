import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPasswordFormComponent } from "./new-password-form/new-password-form.component";

const routes: Routes = [
  { path: '', component: NewPasswordFormComponent },
  { path: ':accessKey/:idCliente', component: NewPasswordFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
