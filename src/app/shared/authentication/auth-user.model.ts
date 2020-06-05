import { BaseResourceModel } from "../../shared/models/base-resource.model";

/*
export interface AuthUser {
  cpf: string;
  dataNascimento: string;
  
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
*/


export class AuthUser extends BaseResourceModel {
  constructor(
    //public id?:number,
    //public login?: string, 
    public senha?: string,
    public idApi?: number,

    public cpf?: string,
    public dataNascimento?: string,
    
    public username?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public ativo?: number,

    public status?: number,
    public msg?: string
  ){
    super();
  }

  /*
  static fromJson(jsonData: any): AuthUser {
    return Object.assign(new AuthUser(), jsonData);
  }
  */
}