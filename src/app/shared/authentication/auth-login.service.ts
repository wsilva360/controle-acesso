import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { API_CONFIG } from 'src/app/config/api.config';

import { AuthUser } from '../authentication/auth-user.model';
import { Error } from '../models/error.model';

import * as moment from "moment";
import * as sha256 from 'sha256';



export class JwtResponse{
    constructor(
        public jwttoken: string,
    ) {}
  
}


@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

    // ATRIBUTOS
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;
    
    public get currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    
    // CONSTRUTOR
    constructor(
        protected route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { 
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // MÉTODOS PÚBLICOS
    authenticate(authUser: AuthUser): Observable<AuthUser> {
        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE LOGIN]: ", authUser);
        
        // Criptografa Senha
        //authUser.senha = sha256(authUser.senha); // Sha256
        //authUser.senha = btoa(authUser.senha);   // Base64

        // Valida Tipo Acesso
        var tipoLogin = "auth/login/ex";

        if(localStorage.getItem('accessKey').trim() === "undefined" || localStorage.getItem('accessKey').trim() === null || localStorage.getItem('accessKey').trim() === "") {
            tipoLogin = "auth/login/in";
        }
        
<<<<<<< HEAD
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + tipoLogin, authUser, { observe: 'response' })
=======
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + "auth/login/" + tipoLogin, authUser, { observe: 'response' })
>>>>>>> a39fc67f904eb79ae4ccc96be1ffd6a75aa953de
            .pipe(
                map(data => {
                    // TOKEN
                    let tokenStr = data.headers.get("Authorization");
                    sessionStorage.setItem("token", tokenStr);
                    
                    // login successful if there's a jwt token in the response
                    if (data && tokenStr) {
                        console.log("SIMMMMMMMMMMMMM TOKEN: " + tokenStr);

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem("currentUser", JSON.stringify(data));
                        this.currentUserSubject.next(data);

                        localStorage.setItem("tipoLogin", tipoLogin);
                    }
                    else {
                        console.log("NÃOOOOOOOOOOOOO TOKEN: " + tokenStr);
                    }

                    return data;
                },
                
            )
        );
    }

    recoverPassword(authUser: AuthUser) {
        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE RECOVER PASSWORD]: ", authUser);

        // Reenvia Senha
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + "auth/recoverpass", authUser, { observe: 'response' })
            .pipe(
                map(data => {
                    console.log("AJUSTEEE ===> " + data);

                    // login successful if there's a jwt token in the response
                    if (data ) {
                        console.log("SIMMMMMMMMMMMMM: ");
                    }
                    else {
                        console.log("NÃOOOOOOOOOOOOO: ");
                    }

                    return data;
                },
                
            )
        );
    }


    newPassword(authUser: AuthUser) {
        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE NEW PASSWORD]: ", authUser);

        // Pega Senha
        authUser.senha = authUser.novaSenha;
        authUser.novaSenha = null;
        authUser.repetirSenha = null;

        // Reenvia Senha
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + "auth/newpass", authUser, { observe: 'response' })
            .pipe(
                map(data => {
                    console.log("AJUSTEEE ===> " + data);

                    // login successful if there's a jwt token in the response
                    if (data ) {
                        console.log("SIMMMMMMMMMMMMM: ");
                    }
                    else {
                        console.log("NÃOOOOOOOOOOOOO: ");
                    }

                    return data;
                },
                
            )
        );
    }





   

    protected handleError(error: any): Observable<any>{
        console.log("[ERROR][MÉTODO][AUTH-LOGIN.SERVICE] - [ERRO NA REQUISIÇÃO]: ", error);
        return throwError(error);
    }

    getInfo() {
        console.log('URL:' + window.location.href);
        console.log('Path:' + window.location.pathname);
        console.log('Host:' + window.location.host);
        console.log('Hostname:' + window.location.hostname);
        console.log('Origin:' + window.location.origin);
        console.log('Port:' + window.location.port);
        console.log('Search String:' + window.location.search);
    }

    getToken() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentToken = sessionStorage.getItem('token');

        if (currentToken) {
            return currentToken;
        } 
        else { 
            return null;
        }
    }
  
    isUserLoggedIn() {
        let user = localStorage.getItem('currentUser')
        return !(user === null)
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();

        sessionStorage.removeItem('token'),
        localStorage.removeItem('currentUser');

        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }   

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }   
    
}