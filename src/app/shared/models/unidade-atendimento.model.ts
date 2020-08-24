import { BaseResourceModel } from "./base-resource.model";

export class UnidadeAtendimento extends BaseResourceModel {
  constructor(
    public idItemAgendamento?: number,
    public descricao?: string
  ){
    super();
  }

  static fromJson(jsonData: any): UnidadeAtendimento {
    return Object.assign(new UnidadeAtendimento(), jsonData);
  }
}
