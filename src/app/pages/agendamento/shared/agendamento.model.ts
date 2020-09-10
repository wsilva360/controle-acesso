import { Beneficiario } from './../../../shared/models/beneficiario.model';
import { Agenda } from './../../../shared/models/agenda.model';
import { UnidadeAtendimento } from './../../../shared/models/unidade-atendimento.model';
import { ItemAgendamento } from './../../../shared/models/item-agendamento.model';
import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Agendamento extends BaseResourceModel {
  constructor(

    public status?: number,
    public mensagem?: string,

    public idItemAgenda?: number,
    public horaAgenda?: string,
    public nomePaciente?: string,
    public itemAgendamento?: ItemAgendamento,
    public idConvenio?: number,
    public idConvenioPlano?: number,

    public agenda?: Agenda,
    public beneficiario?: Beneficiario,
    //public atendimento?: Atendimento,

    public tempoLiberacao?: string,

  ){
    super();
  }

  static fromJson(jsonData: any): Agendamento {
    return Object.assign(new Agendamento(), jsonData);
  }
}
