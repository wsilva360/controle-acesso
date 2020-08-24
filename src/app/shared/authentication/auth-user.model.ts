import { Agendamento } from './../../pages/agendamento/shared/agendamento.model';
import { Beneficiario } from './../models/beneficiario.model';
import { BaseResourceModel } from "../../shared/models/base-resource.model";

export class AuthUser extends BaseResourceModel {
  constructor(
    public acesso?: number,
    public beneficiario?: Beneficiario,
    public agendamento?: Agendamento,

  ){
    super();
  }


  static fromJson(jsonData: any): AuthUser {
    return Object.assign(new AuthUser(), jsonData);
  }
}
