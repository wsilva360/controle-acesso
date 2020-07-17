import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LockScreenFormComponent } from "./lock-screen-form/lock-screen-form.component";

const routes: Routes = [
  { path: '', component: LockScreenFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockScreenRoutingModule { }
