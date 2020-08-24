import { Agenda } from './agenda.model';
import { BaseResourceModel } from "./base-resource.model";

export class Agendamento extends BaseResourceModel {
  constructor(
    public idItemAgenda?: number,
    public horaAgenda?: string,
    public nomePaciente?: string,
    public itemAgendamento?: number,
    public idConvenio?: number,
    public idConvenioPlano?: number,
    public agenda?: Agenda
  ){
    super();
  }


  static fromJson(jsonData: any): Agendamento {
    return Object.assign(new Agendamento(), jsonData);
  }
}
