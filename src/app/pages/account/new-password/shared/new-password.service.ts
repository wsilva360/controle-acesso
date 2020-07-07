import { Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { switchMap } from "rxjs/operators";
import { AuthLoginService } from '../../../../shared/authentication/auth-login.service';


@Injectable({
  providedIn: 'root'
})
export class NewPasswordService extends AuthLoginService {

  // ATRIBUTOS
  protected route: ActivatedRoute;
  protected formBuilder: FormBuilder;


  // CONSTRUTOR
  

  // MÉTODOS PÚBLICOS

}