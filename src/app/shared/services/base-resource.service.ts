import { BaseResourceModel } from "../models/base-resource.model";

import { Injector, Input, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { resource } from 'selenium-webdriver/http';

import { API_CONFIG } from "../../config/api.config";

export abstract class BaseResourceService<T extends BaseResourceModel> {

  // VARIÁVEIS
  private token: string = sessionStorage.getItem('token');
  private userCpf: string = localStorage.getItem("user.idBeneficiario");

  
  // ATRIBUTOS
  protected http: HttpClient;


  // CONSTRUTOR
  constructor(
    protected apiPath: string, 
    protected injector: Injector, 
    protected jsonDataToResourceFn: (jsonData: any) => T
  ){
    console.log("[INFO][CONSTRUTOR][BASE-RESOURCE.SERVICE]");

    this.http = injector.get(HttpClient);
  }


  // MÉTODOS PÚBLICOS
  getAll(): Observable<T[]> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [getAll]: ");

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario");

    return this.http.get(url).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError) 
    )
  }

  getAllById(id: any): Observable<T[]> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [getAllById][ID]: " + id);

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario") + `/${id}`;
    
    return this.http.get(url).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<T> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [getById][IDDDDDDDD]: " + id);

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario") + `/${id}`;

    console.log("WELLLLLLL ====> " + url);

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)      
    )
  }

  create(resource: T): Observable<T> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [create][resource]: " + resource);

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario");

    return this.http.post(url, resource, {headers}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [update][resource]: " + resource);

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario") + `/${resource.id}`;

    return this.http.put(url, resource, {headers}).pipe(
      map(() => resource),
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [delete][id]: " + id);

    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token });
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario") + `/${id}`;

    return this.http.delete(url, {headers}).pipe(
      map(() => null),
      catchError(this.handleError)
    )
  }
 
  // TODO: REVISAR
  teste(id: any): Observable<any> {
    console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [teste][id]: " + id);

    const url = `${this.apiPath}/print`;

    return this.http.post(url, id).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }
  

  // TODO: MUDAR O NOME DO MÉTODO
  print(id: any): Observable<any> {
    //const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario") + `/${id}`;
    const url = `${this.apiPath}/` + localStorage.getItem("user.idBeneficiario");

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  // MÉTODOS PRIVADOS
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push( this.jsonDataToResourceFn(element) )
    );

    console.log("JSON RESOURCES ===> " + resources);

    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any>{
    console.log("[ERROR][MÉTODO][BASE-RESOURCE.SERVICE] - [ERRO NA REQUISIÇÃO]: ", error);
    return throwError(error);
  }

}