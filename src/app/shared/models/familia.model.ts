import { BaseResourceModel } from "./base-resource.model";

export class Familia extends BaseResourceModel {
  constructor(

    public idBeneficiario?: number,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public dataNascimento?: string,
    public vinculoPessoal?: string,

  ){
    super();
  }

  static fromJson(jsonData: any): Familia {
    return Object.assign(new Familia(), jsonData);
  }
}