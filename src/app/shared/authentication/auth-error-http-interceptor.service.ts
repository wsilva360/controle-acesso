import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthLoginService } from '../authentication/auth-login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    // CONSTRUTOR
    constructor(
        private authLoginService: AuthLoginService
    ) { }


    // MÉTODOS PÚBLICOS
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("[ERROR][ErrorInterceptor] - [AUTH-ERROR-HTTP-INTERCEPTOR] - [******]");

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authLoginService.logOut();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;

            console.log("[ERROR][AUTH-ERROR-HTTP-INTERCEPTOR] - [******][MENSAGEM]: ", error);

            return throwError(error);
        }))
    }

}