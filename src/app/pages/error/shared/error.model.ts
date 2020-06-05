import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Error extends BaseResourceModel {
  constructor(
    public id?:number,
  ){
    super();
  }
  

  static fromJson(jsonData: any): Error {
    return Object.assign(new Error(), jsonData);
  }
}