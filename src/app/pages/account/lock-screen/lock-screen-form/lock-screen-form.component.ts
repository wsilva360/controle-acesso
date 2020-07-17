import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LockScreen } from '../shared/lock-screen.model';
import { LockScreenService } from '../shared/lock-screen.service';
import { AuthLoginService } from '../../../../shared/authentication/auth-login.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-lock-screen-form',
  templateUrl: './lock-screen-form.component.html',
  styleUrls: ['./lock-screen-form.component.css']
})
export class LockScreenFormComponent implements OnInit  {

  // VARIÁVEIS
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  
  accessKey: string;
  urlOrigem: string;
  idCliente: string;

  isTextFieldType: boolean = false;  
  error = '';
  showDialogError: boolean = false;

  // ATRIBUTOS
  public formSubmitAttempt: boolean;
  


  // MASCARA
  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public mascaraCarteiraIamspe = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  
  // CONSTRUTOR
  constructor(
      protected formBuilder: FormBuilder,
      protected route: ActivatedRoute,
      protected router: Router,
      protected authLoginService: AuthLoginService,
      //private alertService: AlertService
  ) {
    console.log("[INFO][LOCK-SCREEN-FORM] - [CONSTRUTOR]");
    console.log("[INFO][LOCK-SCREEN-FORM] - [CURRENTE USER VALUE]: " + this.authLoginService.currentUserValue);
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    localStorage.clear();
    
    this.buildResourceForm();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  /*** 
  * Validar campos inválidos
  */
  isFieldInvalid(field: string) {
    return (
      (!this.resourceForm.get(field).valid && this.resourceForm.get(field).touched) ||
      (this.resourceForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.resourceForm.controls; }
  
  /*** 
  * Mostrar e esconder senha
  */
  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  /*** 
  * Subimete Formulário
  */
  submitForm() {
    console.log("SUBMIT");

    // Valida campos preenchidos
    if (this.resourceForm.invalid) {
      return;
    }

    this.submittingForm = true;

    // Valida Login
    if (this.resourceForm.valid) {
      
      // Obtem o valores dos parâmetros da URL
      localStorage.setItem('idCliente', this.route.snapshot.params.idCliente);
      localStorage.setItem('urlOrigem', encodeURI(this.route.snapshot.params.urlOrigem));
      localStorage.setItem('accessKey', this.route.snapshot.params.accessKey);

      // Authencicação no PoolService - Guardian
      return this.authLoginService.authenticate(this.resourceForm.value)
      .pipe(first())
      .subscribe(
          data => {
            console.log("DATA == " + data)
            //this.router.navigate([this.returnUrl]);
            
            // Redireciona para URL ORIGEM
            //window.open(localStorage.getItem("urlOrigem"), "_blank");
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.log("ERRO1 == " + error);
            console.log("ERRO1 == " + status);
            console.log("ERRO1 == " + error.status);
            
            this.actionsForError(error);
            //this.alertService.error(error);
            //this.loading = false;
          });  

    }

    this.formSubmitAttempt = true;
  }


  // MÉTODOS - AÇÕES MENSAGEM
  protected actionsForError(error){
    //toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    console.log(" actionsForError ******: " + error);

    switch(error.status) {
      case 401:
      case 403:
        console.log("AAAAAAA");
        this.serverErrorMessages = ["401", "LOGIN OU SENHA INVÁLIDO"];
        break;

      case 422:
        this.serverErrorMessages = JSON.parse(error._body).errors;
        break;

      default:
        this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde.****"];
    }
  }

}
