import { BaseResourceModel } from "./base-resource.model";

import { Prestador } from "./prestador.model";

export class Agenda extends BaseResourceModel {
  constructor(

    public idAgenda?: number,
    public prestador?: Prestador,

  ){
    super();
  }
  
  static fromJson(jsonData: any): Agenda {
    return Object.assign(new Agenda(), jsonData);
  }
}