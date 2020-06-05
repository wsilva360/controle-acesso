import { BaseResourceModel } from "./base-resource.model";

export class Telefone extends BaseResourceModel {
  constructor(

    public idTelefone?: number,
    public ddd?: number,
    public numero?: number,
    public dataAtualizacao?: string,
    public idUsuarioAtualizacao?: number,
    public ramal?: number,
    public contato?: string,
    public snPrincipal?: string,
    public tipoTelefone?: string

  ){
    super();
  }
  
  static fromJson(jsonData: any): Telefone {
    return Object.assign(new Telefone(), jsonData);
  }
}