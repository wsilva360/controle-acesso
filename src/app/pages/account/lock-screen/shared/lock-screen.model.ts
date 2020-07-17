import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class LockScreen extends BaseResourceModel {
  constructor(
        
  ){
    super();
  }
  
  static fromJson(jsonData: any): LockScreen {
    return Object.assign(new LockScreen(), jsonData);
  }
}