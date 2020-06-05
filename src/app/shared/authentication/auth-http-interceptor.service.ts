import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

    // CONSTRUTOR
    constructor(private authLoginService: AuthLoginService) { console.log("INTERCEPT aasaasdadsadsadsaaadsadsads"); }


    // MÉTODOS PÚBLICOS
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [SESSION USERNAME] : " + localStorage.getItem('currentUser'));
        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [SESSION TOKEN] : " + sessionStorage.getItem('token'));
        
        //console.log("UUUUUUUSER ===> " + this.authLoginService.currentUserValue.cpf);

        if (localStorage.getItem('currentUser') && sessionStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
                }                
            });
        }

        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [RESULTADO] : " + req.headers.get('Authorization'));
        
        return next.handle(req);
    }
}