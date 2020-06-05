import { OnInit, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

declare var $: any;

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit, AfterViewInit, OnDestroy {

  // VARIÁVEIS
  resources: T[] = [];


  // CONSTRUTOR
  constructor(private resourceService: BaseResourceService<T>) {
    console.log("[INFO][CONSTRUTOR][BASE-RESOURCE-LIST.COMPONENT]");
  }


  // MÉTODOS PÚBLICOS ANGULAR
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getList();
  }

  ngOnDestroy(): void {
  }


  // MÉTODOS PÚBLICOS
  deleteResource(resource: T) {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [deleteResource]: " + resource);

    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir!")
      )
    }
  }

  getList() {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [getList]: ");

    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a,b) => b.id - a.id),
      //resources => console.log("LIST ==== " + resources),
      error => alert('Erro ao carregar a lista')
    )
  }

  getCarrega() {
    console.log("[INFO][MÉTODO][BASE-RESOURCE-LIST.COMPONENT] - [carrega]: ");

    this.resourceService.getAll().subscribe(
      (resources: T[]) => {
        this.resources = resources;
        //this.dtTrigger.next();
      },
      (error) => { console.log(error); }
    );
  }

}
