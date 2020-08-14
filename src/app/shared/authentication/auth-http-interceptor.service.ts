import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, config } from 'rxjs';

import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

    // CONSTRUTOR
    constructor(private authLoginService: AuthLoginService) { }


    // MÉTODOS PÚBLICOS
    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        console.log("[INFO][Interceptor] - [AUTH-HTTP-INTERCEPTOR]");

        if (localStorage.getItem("currentUser") && sessionStorage.getItem("token")) {
            request = request.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem("token")
                } 
            });
        }
        
        return next.handle(request);
    }
}