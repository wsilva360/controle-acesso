import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class NewPassword extends BaseResourceModel {
  constructor(
    
    public cpf?: string,
    public novaSenha?: string,
    public repetirSenha?: string,

  ){
    super();
  }
  
  static fromJson(jsonData: any): NewPassword {
    return Object.assign(new NewPassword(), jsonData);
  }
}