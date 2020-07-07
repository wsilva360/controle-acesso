import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RecoverPassword } from '../shared/recover-password.model';
import { RecoverPasswordService } from '../shared/recover-password.service';
import { AuthLoginService } from '../../../../shared/authentication/auth-login.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrls: ['./recover-password-form.component.css']
})
export class RecoverPasswordFormComponent implements OnInit  {

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
  showDialogMessage: boolean = false;


  // ATRIBUTOS
  public formSubmitAttempt: boolean;


  // MASCARA
  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  

  // CONSTRUTOR
  constructor(
      protected formBuilder: FormBuilder,
      protected route: ActivatedRoute,
      protected router: Router,
      protected authLoginService: AuthLoginService,
      //private alertService: AlertService
  ) {
    console.log("[INFO][RECOVER-PASSWORD-FORM] - [CONSTRUTOR]");
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    localStorage.clear();
    
    this.buildResourceForm();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required]],
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

      // Authencicação no PoolService - Guardian
      return this.authLoginService.recoverPassword(this.resourceForm.value)
      .pipe(first())
      .subscribe(
          data => {
            console.log("DATA == " + data)
            //this.router.navigate([this.returnUrl]);
            // Redireciona para URL ORIGEM
            //window.open(localStorage.getItem("urlOrigem"), "_blank");
          },
          error => {
            console.log("ERRO1 == " + error);
            console.log("ERRO1 == " + status);
            console.log("ERRO1 == " + error.status);
            
            this.actionsForError(error);
            
          });  

    }

    this.formSubmitAttempt = true;
  }


  // MÉTODOS - AÇÕES MENSAGEM
  protected actionsForError(error){
    //toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    console.log(" actionsForError ******: " + error);

    // Remover essa mensagem
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
