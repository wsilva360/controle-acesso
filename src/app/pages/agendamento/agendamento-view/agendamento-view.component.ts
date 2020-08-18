import { Component, OnInit, AfterViewInit, OnDestroy, Injector } from '@angular/core';

import { Router } from '@angular/router';

import { BaseResourceViewComponent } from "../../../shared/components/base-resource-view/base-resource-view.component";

import { Agendamento } from "../shared/agendamento.model";
import { AgendamentoService } from "../shared/agendamento.service";

@Component({
  selector: 'app-agendamento-view',
  templateUrl: './agendamento-view.component.html',
  styleUrls: ['./agendamento-view.component.css']
})
export class AgendamentoViewComponent extends BaseResourceViewComponent<Agendamento> implements OnInit, AfterViewInit {

  // Variável
  cols: any[];
  isButtonEditVisible = false;


  // ATRIBUTOS
  protected router: Router;


  // CONSTRUTOR
  constructor(protected agendamentoService: AgendamentoService, protected injector: Injector) { 
    super(injector, new Agendamento(), agendamentoService, Agendamento.fromJson)

    console.log("[INFO][CONSTRUTOR][AGENDAMENTO-VIEW.COMPONENT]");
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }
  
}
