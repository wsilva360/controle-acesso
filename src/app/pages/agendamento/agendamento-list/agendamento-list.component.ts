import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";

import { Agendamento } from "../shared/agendamento.model";
import { AgendamentoService } from "../shared/agendamento.service";

import { ConfirmationService } from 'primeng/api';

import { API_CONFIG } from 'src/app/config/api.config';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css']
})
export class AgendamentoListComponent extends BaseResourceListComponent<Agendamento> implements OnInit {

  // VARIÁVEIS
  cols: any[];
  mensagem: any;


  // ATRIBUTOS
  showDialogConfirmaAgendamento: boolean = false;
  _idAgendaItem: number = 0;
  _mensagem: string = "";


  // CONSTRUTOR
  constructor(
    private agendamentoService: AgendamentoService, 
    private confirmationService: ConfirmationService, 
    private router: Router,
    private http: HttpClient
  ) {
    super(agendamentoService);
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    this.templateheader();
  }

  ngOnDestroy() {
  }

  templateheader() {
    this.cols = [
      { field: 'idItemAgenda', header: 'Id Agendamento', width: '15%', sortable: true },
      { field: 'nomePaciente', header: 'Especialidade', width: '60%', sortable: true },
      { field: 'horaAgenda', header: 'Hora', width: '20%', sortable: true  },
    ];
  }


  // MÉTODOS PRIVADOS
  abrirAtendimento(idAgendaItem?: any) {
    console.log("[INFO][AGENDAMENTO-LIST] - [ABRIR ATENDIMENTO]: ", idAgendaItem);

    const url = API_CONFIG.baseUrl_MV + `agendamento/${idAgendaItem}/new`;

    return this.http.get<any>(url).subscribe(
      data => {
        console.log(data)
        if (data.status == 2 || data.status == 0) {
          sessionStorage.setItem('IdAtendimento', data.atendimento.idAtendimento);
          
          //this.confirm(idItemAgenda, data.mensagem);
          this._idAgendaItem = idAgendaItem;
          this._mensagem = data.mensagem;

          this.confirmarTelemedicina();
        }
        else {
          // Mensagem de erro
          
        }
      },
      err => {
        console.log(err)
      },
      () => console.log('yay')
    );
  }

  confirmarTelemedicina() {
    console.log("[INFO][CONFIRMAR AGENDAMENTO] - [SHOW MODAL]: ");

    this.showDialogConfirmaAgendamento = true;
  }

  termoAceiteSim() {
    if (this._idAgendaItem != 0) {
      this.router.navigate(['beneficiario/agendamento', this._idAgendaItem, 'view']).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }
  }

  // MENSAGEM
  confirm(id?: number, aviso?: string) {
    this.confirmationService.confirm({
      message: 'Agendamento',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.router.navigate(['beneficiario/agendamento', id, 'view']).then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
      },
      reject: () => {
          //
          
      }
    });
  }

}
