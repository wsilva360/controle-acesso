import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from '../shared/login.model';
import { LoginService } from '../shared/login.service';
import { AuthLoginService } from '../../../../shared/authentication/auth-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit  {

  // VARIÁVEIS
  loading = false;

  tokenCliente: string;
  urlOrigem: string;
  idCliente: string;


  // ATRIBUTOS
  public resourceForm: FormGroup;
  public formSubmitAttempt: boolean;
  submittingForm: boolean;

  // MASCARA
  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public mascaraCnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public mascaraTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mascaraTelefoneFixo = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mascaraCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public mascaraNascimento = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public qtdHoras = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public mascaraNit = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];

  public mascaraCarteiraIamspe = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  
  // CONSTRUTOR
  constructor(
      protected formBuilder: FormBuilder,
      protected route: ActivatedRoute,
      protected router: Router,
      protected authLoginService: AuthLoginService,
      //private alertService: AlertService
  ) {

    console.log("[INFO][LOGIN-FORM] - [CONSTRUTOR]");
    console.log("[INFO][LOGIN-FORM] - [CURRENTE USER VALUE]: " + this.authLoginService.currentUserValue);

    // redirect to home if already logged in
    // VOLTAR ISSO
    /*  
    if (this.authLoginService.currentUserValue) { 
      
      console.log("[INFO][LOGIN-FORM] - [CONSTRUTOR]: 11111111111");

      this.router.navigate(['/']);
    }
    */

    /*
    this.route.queryParams.subscribe(params => {
      this.tokenCliente = params['tokenCliente'];
      this.urlOrigem = params['urlOrigem'];
      this.idCliente = params['idCliente'];

      console.log("params === " + params);
    });
    */

    console.log("CUINTOOO ====> " + this.route.snapshot.queryParamMap.get('tokenCliente'));
    console.log("URLLLLLL ====> " + this.route.snapshot.queryParams['tokenCliente']);

    

    console.log("tokenCliente === " + this.tokenCliente);
    console.log("urlOrigem    === " + this.urlOrigem);
    console.log("idCliente    === " + this.idCliente);


  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    localStorage.clear();
    
    this.buildResourceForm();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      //senha: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.resourceForm.get(field).valid && this.resourceForm.get(field).touched) ||
      (this.resourceForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  submitForm() {

    // stop here if form is invalid
    if (this.resourceForm.invalid) {
      return;
    }

    this.loading = true;

    console.log("SUBMIT ");

    // Valida Login
    if (this.resourceForm.valid) {

      console.log("AAAAAAAAAAAAAA ");

      


      this.authLoginService.authenticate(this.resourceForm.value);

      console.log("BBBBBBBBBBBBBB ");
    }

    this.formSubmitAttempt = true;
  }

}
