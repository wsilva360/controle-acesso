import { OnInit, AfterContentChecked, Injector, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../models/base-resource.model"
import { BaseResourceService } from "../../services/base-resource.service"

import { switchMap } from "rxjs/operators";

//import toastr from "toastr";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked, AfterViewInit {
  
  // VARIÁVEIS
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;


  // ATRIBUTOS
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;


  // CONSTRUTOR
  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) { 
    console.log("[INFO][BASE-RESOURCE-FORM.COMPONENT] - [constructor]");

    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterViewInit() {
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new")
      this.createResource();
    else // currentAction == "edit"
      this.updateResource();
  }


  // MÉTODOS PRIVADOS
  protected setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  protected loadResource() {
    if (this.currentAction == "edit") {
      
      console.log("ENTROUUUUUUUUU ==== EDIT");

      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource) // binds loaded resource data to resourceForm
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )

      console.log("RESOUUUUUUCE ==== " + this.resource.id);
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = this.creationPageTitle();
    else{
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string{
    return "Novo"
  }

  protected editionPageTitle(): string{
    return "Edição"
  }


  // CRUD
  protected createResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      )
  }

  protected updateResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      )
  }
  
  // MÉTODOS - AÇÕES MENSAGEM
  protected actionsForSuccess(resource: T){
    //toastr.success("Solicitação processada com sucesso!");

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirect/reload component page
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    )
  }

  protected actionsForError(error){
    //toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }

  protected abstract buildResourceForm(): void;
  
}
