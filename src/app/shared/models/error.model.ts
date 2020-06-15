import { BaseResourceModel } from "./base-resource.model";

export class Error extends BaseResourceModel {
  constructor(
    
    public status?: string,
    public message?: string,
    public trace?: string,
    public idApi?: number,
    public idProc?: number,
    public dataLog?: number,
    
  ){
    super();
  }
  
  static fromJson(jsonData: any): Error {
    return Object.assign(new Error(), jsonData);
  }
}