import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Agendamento extends BaseResourceModel {
  constructor(
    
    public status?: number,
    public mensagem?: string,

    public idItemAgenda?: number,
    public horaAgenda?: string,
    public nomePaciente?: string,
    public itemAgendamento?: number,
    public idConvenio?: number,
    public idConvenioPlano?: number,

    //public agenda?: Agenda,
    //public beneficiario?: Beneficiario,
    //public atendimento?: Atendimento,

    public tempoLiberacao?: string,

  ){
    super();
  }  

  static fromJson(jsonData: any): Agendamento {
    return Object.assign(new Agendamento(), jsonData);
  }
}