import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoListComponent } from "./agendamento-list/agendamento-list.component";
import { AgendamentoViewComponent } from "./agendamento-view/agendamento-view.component";

const routes: Routes = [
  { path: '', component: AgendamentoListComponent },
  //{ path: 'new', component: AgendamentoFormComponent },
  //{ path: ':id/edit', component: AgendamentoFormComponent },
  { path: ':id/view', component: AgendamentoViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
