import { OnInit, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

import { switchMap } from "rxjs/operators";

declare var $: any;

export abstract class BaseResourceViewComponent<T extends BaseResourceModel> implements OnInit, AfterViewInit, OnDestroy {

  // VARIÁVEIS
  public resources: T[] = [];
  

  // ATRIBUTOS
  protected route: ActivatedRoute;
  protected router: Router;


  // CONSTRUTOR
  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    console.log("[INFO][CONSTRUTOR][BASE-RESOURCE-VIEW.COMPONENT]");

    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }
  

  // MÉTODOS PÚBLICOS ANGULAR
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.loadResource();
  }

  ngOnDestroy(): void {
  }


  // MÉTODOS PRIVADOS
  loadResource() {

    //if (this.currentAction == "view") {
      this.route.paramMap.pipe(
        //switchMap(params => this.resourceService.getById(+params.get("id")))
        switchMap(params => this.resourceService.print(+params.get("id")))
      )
      .subscribe(
        (resources) => {
          this.resource = resources;
          console.log("RE ==> " + resources);
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    //}
  }

  
  getListByIda(param:any) {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [getListById]: " + param);

    this.resourceService.getAllById(param).subscribe(
      resources => this.resources = resources.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    )
  }

  getListById(param:any) {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [getListById]: " + param);
    const a = "/" + param;

    this.resourceService.getById(param).subscribe(
      resources => this.resource = resources,
      error => alert('Erro ao carregar a lista')
    )
  }


  getListAllById() {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [LISTA TUDO]: ");

    this.resourceService.getAll().subscribe(
      //resources => this.resources = resources.sort((a,b) => b.id - a.id),
      resources => console.log(resources),
      error => alert('Erro ao carregar a lista')
    )

    console.log("this.resource ===> " + this.resource);
  }

}
