import { Beneficiario } from './../../../../shared/models/beneficiario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from '../../../../shared/authentication/auth-login.service';
import { registerLocaleData } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // VARIÁVEIS
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  isTextFieldType: boolean = false;
  error = '';
  showDialogError: boolean = false;

  item:string;
  unid:string;
  data:number = Date.now();
  dataAgenda:string;
  imagePath:any;


  // ATRIBUTOS


  public formSubmitAttempt: boolean;

  // CONSTRUTOR
  constructor(
    protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected authLoginService: AuthLoginService,
    private _sanitizer: DomSanitizer) {

  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
    localStorage.clear();

    this.buildResourceForm();
  }


  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      acesso: [null, [Validators.required]]
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
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  /***
  * Subimete Formulário
  */
  submitForm(event) {

    this.serverErrorMessages = null;

    if (event.keyCode === 13) {
      console.log('SUBMIT');

      // Valida campos preenchidos
      if (this.resourceForm.invalid) {
        return;
      }

      this.submittingForm = true;

      // Valida Login
      if (this.resourceForm.valid) {


        // Authencicação no PoolService - Guardian
        return this.authLoginService.authenticate(this.resourceForm.value)
          //.pipe(first())
          .subscribe(
            data => {
              console.log("DATA == " + data.beneficiario.prontuario);
              this.item = data.agendamento.itemAgendamento.descricao;
              this.unid = data.agendamento.agenda.unidadeAtendimento.descricao;
              this.dataAgenda = data.agendamento.horaAgenda;
              this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + data.beneficiario.qrCode);
              console.log(this.dataAgenda);
            },
            error => {
              console.log(error.error.message == null);
              this.serverErrorMessages = (error.error.message != null) ? [error.error.message] : ['Erro ao conectar com servidor'];
            }, () => {
              setTimeout(() => {window.print()}, 1000);
            });

      }

      this.formSubmitAttempt = true;
    }

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  }


  // Mask
  cpfcnpjmask(rawValue) {
    let numbers = rawValue.match(/\d/g);
    let numberLength = 0;

    if (numbers) {
      numberLength = numbers.join('').length;
    }

    let mask;

    switch (numberLength) {
      case 3:
        mask = [/\d/, /\d/, /\d/];
        break;

      case 4:
        mask = [/\d/, /\d/, /\d/, /\d/];
        break;

      case 5:
        mask = [/\d/, /\d/, /\d/, /\d/, /\d/];
        break;

      case 6:
        mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        break;

      case 7:
        mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        break;

      case 8:
        mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        break;

      case 9:
        mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        break;

      default:
        mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    }

    return mask;
  }
}
