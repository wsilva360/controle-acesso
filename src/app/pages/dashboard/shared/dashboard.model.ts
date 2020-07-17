import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Dashboard extends BaseResourceModel {
  constructor(
    public id?:number,
  ){
    super();
  }
  

  static fromJson(jsonData: any): Dashboard {
    return Object.assign(new Dashboard(), jsonData);
  }
}