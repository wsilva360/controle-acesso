import { BaseResourceModel } from "./base-resource.model";

export class Endereco extends BaseResourceModel {
  constructor(

    public idEndereco?: number,
    public tipoLogradouro?: string,
    public logradouro?: string,
    public numero?: number,
    public complemento?: string,
    public bairro?: string,
    public cep?: number,
    public municipio?: string,
    public idIbge?: string,
    public dataAtualizacao?: string,
    public uf?: string,
    public dddTelResidencial?: string,
    public telResidencial?: string,
    public dddTelCelular?: string,
    public telCelular?: string,
    public dddTelComercial?: string,
    public telComercial?: string,
    public email?: string,
    public observacao?: string,
    public snPrincipal?: string,
    public tipoEndereco?: string, 

  ){
    super();
  }
  
  static fromJson(jsonData: any): Endereco {
    return Object.assign(new Endereco(), jsonData);
  }
}