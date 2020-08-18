import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { AgendamentoViewComponent } from './agendamento-view/agendamento-view.component';

@NgModule({
  declarations: [AgendamentoViewComponent, AgendamentoListComponent],
  imports: [
    SharedModule,
    AgendamentosRoutingModule
  ]
})
export class AgendamentosModule { }
