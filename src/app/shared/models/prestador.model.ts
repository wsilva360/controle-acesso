import { BaseResourceModel } from "./base-resource.model";

export class Prestador extends BaseResourceModel {
  constructor(

    public idPrestador?: number,
    public nomePrestador?: string,

  ){
    super();
  }
  
  static fromJson(jsonData: any): Prestador {
    return Object.assign(new Prestador(), jsonData);
  }
}