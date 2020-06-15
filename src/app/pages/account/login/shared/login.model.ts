import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class Login extends BaseResourceModel {
  constructor(
        
  ){
    super();
  }
  
  static fromJson(jsonData: any): Login {
    return Object.assign(new Login(), jsonData);
  }
}