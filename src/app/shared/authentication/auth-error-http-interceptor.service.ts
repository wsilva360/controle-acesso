import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthLoginService } from '../authentication/auth-login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    serverErrorMessages: string[] = null;


    // CONSTRUTOR
    constructor(private authLoginService: AuthLoginService) { }


    // MÉTODOS PÚBLICOS
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("[ERROR][ErrorInterceptor] - [AUTH-ERROR-HTTP-INTERCEPTOR] - [******][REQUEST]: " + request);
        console.log("[ERROR][ErrorInterceptor] - [AUTH-ERROR-HTTP-INTERCEPTOR] - [******][NEXT]: " + next);
        

        return next.handle(request).pipe(catchError(err => {
            console.log("AAAA =========>>>>>>>> " + err.status);

            /*if (err.status === 401 || err.status === 403) {
                // auto logout if 401 or 403 response returned from api
                //this.authLoginService.logOut();
                //location.reload(true);
            }*/

            // Tratamento código de status
            switch(err.status) {
                case 401:
                case 403:
                  this.serverErrorMessages = ["LOGIN OU SENHA INVÁLIDO 0111"];
                  break;
                
                case 422:
                  this.serverErrorMessages = JSON.parse(err._body).errors;
                  break;
                
                default:
                  this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde.****"];
            }

            console.log("SERVER ERROR MESSAGER ---- INTERCEPTOR ----->>>: " + this.serverErrorMessages);

            const error = err.error.message || err.statusText;
            console.log("[ERROR][AUTH-ERROR-HTTP-INTERCEPTOR] - [******][MENSAGEM]: ", error);
            return throwError(err);
        }))
    }

}