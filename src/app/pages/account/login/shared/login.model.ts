import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class Login extends BaseResourceModel {
  constructor(

    public idBeneficiario?: number,
    public login?: string, 
    //public senha?: string,
    public dataNascimento?: string,
    public idApi?: number,

    public nome?: string,
    public cpf?: string,
    public carteira?: string,
    //public dataNascimento?: string,
    public status?: number,
    public msg?: string
    
  ){
    super();
  }
  
  static fromJson(jsonData: any): Login {
    return Object.assign(new Login(), jsonData);
  }
}