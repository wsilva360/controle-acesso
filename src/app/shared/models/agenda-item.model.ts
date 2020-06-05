import { BaseResourceModel } from "./base-resource.model";

export class AgendaItem extends BaseResourceModel {
  constructor(
    
    public idItemAgenda?: string,
    public horaAgenda?: string,
    public nomePaciente?: string,
    public itemAgendamento?: number,
    public idConvenio?: number,
    public idConvenioPlano?: number,
    
  ){
    super();
  }
  
  static fromJson(jsonData: any): AgendaItem {
    return Object.assign(new AgendaItem(), jsonData);
  }
}