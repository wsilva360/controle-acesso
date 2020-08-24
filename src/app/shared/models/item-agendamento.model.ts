import { BaseResourceModel } from "../../shared/models/base-resource.model";

export class ItemAgendamento extends BaseResourceModel {
  constructor(
    public idItemAgendamento?: number,
    public descricao?: string
  ){
    super();
  }


  static fromJson(jsonData: any): ItemAgendamento {
    return Object.assign(new ItemAgendamento(), jsonData);
  }
}
