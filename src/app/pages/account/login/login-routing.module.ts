import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginListComponent } from "./login-list/login-list.component";
import { LoginFormComponent } from "./login-form/login-form.component";

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: ':accessKey/:urlOrigem/:idCliente', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
