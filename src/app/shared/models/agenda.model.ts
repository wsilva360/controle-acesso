import { UnidadeAtendimento } from './unidade-atendimento.model';
import { Prestador } from './prestador.model';
import { BaseResourceModel } from "./base-resource.model";

export class Agenda extends BaseResourceModel {
  constructor(
    public idAgenda?: number,
    public prestador?: Prestador,
    public unidadeAtendimento?: UnidadeAtendimento
  ){
    super();
  }


  static fromJson(jsonData: any): Agenda {
    return Object.assign(new Agenda(), jsonData);
  }
}
