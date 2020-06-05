import { BaseResourceModel } from "./base-resource.model";

import { Telefone } from './telefone.model';
import { Endereco } from './endereco.model';
import { Familia } from './familia.model';

export class Beneficiario extends BaseResourceModel {
  constructor(

    public status?: number,
    public mensagem?: string,
    public data?: string,

    public id?: number,
    public idBeneficiario?: number,

    public nome?: string,
    public email?: string,
    public sexo?: string,
    public estadoCivil?: string,
    public cpf?: string,
    public nomeMae?:string,
    public dataNascimento?: string,
    public rg?: string,
    public orgaoRg?: string,
    public validadeCarteira?: string,
    public carteira?: string,
    public digitoCarteira?: string,
    public idTitular?: string,
    public nomeSocial?: string,
    public ufNascimento?: string,
    public nomePai?: string,
    public dataAtualizacao?: string,
    public idUsuarioUpdate?: string,
    public nacionalidade?: string,
    public idVinculoPessoal?: number,
    public vinculoPessoal?: string,
    public idStatusBeneficiario?: number,
    public statusBeneficiario?: string,
    public idTelefone?: string,
    public ddd?: string,
    public numeroTel?: string,
    public ramal?: string,
    public contato?: string,
    public tipoTelefone?: string,
    public idEndereco?: number,
    public tipoLogradouro?: string,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public municipio?: string,
    public idIbge?: string,
    public uf?: string,
    public observacao?: string,
    public tipoEndereco?: string,

    public prontuario?: string,
    

    public listaEndereco?: Endereco[],
    public listaTelefone?: Telefone[],
    //public listaEmail: Email[],
    public listaFamilia?: Familia[],

  

  ){
    super();
  }
  
  static fromJson(jsonData: any): Beneficiario {
    return Object.assign(new Beneficiario(), jsonData);
  }
}