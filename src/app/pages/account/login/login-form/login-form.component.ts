import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
  isTextFieldType: boolean = false;
  tokenCliente: string;
  urlOrigem: string;
  idCliente: string;
  error = '';


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
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    localStorage.clear();
    
    this.buildResourceForm();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      senha: [null, [Validators.required]],

      idCliente: this.route.snapshot.params.idCliente,
      urlOrigem: this.route.snapshot.params.urlOrigem,
      tokenCliente: this.route.snapshot.params.tokenCliente,
      //dataNascimento: [null, [Validators.required]],
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
    console.log("SUBMIT ");

    // stop here if form is invalid
    if (this.resourceForm.invalid) {
      return;
    }

    this.loading = true;

    // Valida Login
    if (this.resourceForm.valid) {

      localStorage.setItem('idCliente', this.route.snapshot.params.idCliente);
      localStorage.setItem('urlOrigem', this.route.snapshot.params.urlOrigem);
      localStorage.setItem('tokenCliente', this.route.snapshot.params.tokenCliente);

      //console.log("RAaaaa ===> " + this.resourceForm.value());

      this.authLoginService.authenticate(this.resourceForm.value);
      //this.authLoginService.login(this.resourceForm.value);
    }

    this.formSubmitAttempt = true;
  }

  

}
