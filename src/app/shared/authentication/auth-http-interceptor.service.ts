import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

    // CONSTRUTOR
    constructor() { }


    // MÉTODOS PÚBLICOS
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [SESSION USERNAME] : " + localStorage.getItem('currentUser'));
        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [SESSION TOKEN] : " + sessionStorage.getItem('token'));

        if (localStorage.getItem('currentUser') && sessionStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
                }                
            });
        }

        console.log("[INFO][AUTH-HTTP-INTERCEPTOR] - [RESULTADO] : " + req);
        
        return next.handle(req);
    }
}