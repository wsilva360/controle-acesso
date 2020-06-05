import { BaseResourceModel } from "./base-resource.model";

import { Beneficiario } from "./beneficiario.model";

export class Atendimento extends BaseResourceModel {
  constructor(

    public idAtendimento?: number,
    public tipoAtendimento?: string,
    public beneficiario?: Beneficiario,
    
  ){
    super();
  }
  
  static fromJson(jsonData: any): Atendimento {
    return Object.assign(new Atendimento(), jsonData);
  }
}