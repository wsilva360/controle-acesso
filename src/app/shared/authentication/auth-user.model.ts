import { BaseResourceModel } from "../../shared/models/base-resource.model";

export class AuthUser extends BaseResourceModel {
  constructor(
    public idApi?: number,

    public cpf?: string,
    public login?: string,
    public senha?: string,
    public dataNascimento?: string,
    
    public idCliente?: string,
    public urlOrigem?: string,
    public tokenCliente?: string,

    public username?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public ativo?: number,

    public status?: number,
    public message?: string
  ){
    super();
  }

  
  static fromJson(jsonData: any): AuthUser {
    return Object.assign(new AuthUser(), jsonData);
  }
}