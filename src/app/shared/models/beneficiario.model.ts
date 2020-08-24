import { BaseResourceModel } from "../../shared/models/base-resource.model";

export class Beneficiario extends BaseResourceModel {
  constructor(
    public idBeneficiario?: number,
    public prontuario?: number,
    public qrCode?: string,
    public carteira?: string,
    public nome?: string
  ){
    super();
  }


  static fromJson(jsonData: any): Beneficiario {
    return Object.assign(new Beneficiario(), jsonData);
  }
}
