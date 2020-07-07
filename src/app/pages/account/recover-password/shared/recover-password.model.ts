import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class RecoverPassword extends BaseResourceModel {
  constructor(

      public email?: string
      
  ){
    super();
  }
  
  static fromJson(jsonData: any): RecoverPassword {
    return Object.assign(new RecoverPassword(), jsonData);
  }
}