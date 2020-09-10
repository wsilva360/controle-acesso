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
            // Tratamento código de status


            console.log("SERVER ERROR MESSAGER ---- INTERCEPTOR ----->>>: " + this.serverErrorMessages);

            const error = err.error.message || err.statusText;

            this.serverErrorMessages = error;
            console.log("[ERROR][AUTH-ERROR-HTTP-INTERCEPTOR] - [******][MENSAGEM]: ", error);
            return throwError(err);
        }))
    }

}
