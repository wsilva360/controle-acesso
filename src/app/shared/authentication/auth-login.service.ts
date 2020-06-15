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
    login(credentials): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
          username: credentials.username,
          password: credentials.password
        }, httpOptions);
    }
    
    register(user): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
          username: user.username,
          email: user.email,
          password: user.password
        }, httpOptions);
    }























    authenticate1(authUser: AuthUser) {
        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE]: ", authUser);
        
        // Criptografa Senha
        //authUser.senha = sha256(authUser.senha); // Sha256
        authUser.senha = btoa(authUser.senha);   // Base64
        

        // Authencicação no PoolService - Guardian
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + "auth/ex", authUser).subscribe(
            data => {
                console.log("ENTROU");
                console.log(data);

                // TOKEN
                let token = "aVEIOOOO "; //data.headers.get("Authorization");
                sessionStorage.setItem('token', token);
                console.log("TOKEN ===> " + token);


                //if (data && token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(authUser));
                    this.currentUserSubject.next(authUser);
                    
                    console.log("Currente Usuário ===> " + localStorage.getItem('currentUser'));

                    //this.router.navigate(['https://www.google.com']);
                    //window.location.href = "" + data.body.urlOrigem;

                    console.log("URL ====> " + data.urlOrigem);

                    //window.open("http://" + data.body.urlOrigem);
                //}

                return data;
            },
            error => {
                console.log('OOPS...', error);
                
                /*
                if (error.status == 500) {
                    this.alertService.showError(error.statusText);
                } else if (error.status == 588) {
                    this.alertService.showAlert(error.statusText);
                }
                */

                //this.errorMessage = err.error.message;
                //this.isSingUpFailed = true;
            }
            //catchError(this.handleError('addHero', hero))
            
        );
    }

    authenticate(authUser: AuthUser): Observable<AuthUser> {
        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE]: ", authUser);
        
        // Criptografa Senha
        //authUser.senha = sha256(authUser.senha); // Sha256
        authUser.senha = btoa(authUser.senha);   // Base64
        

        // Authencicação no PoolService - Guardian
        return this.http.post<AuthUser>(API_CONFIG.baseUrl_Guardian + "auth/ex", authUser, { observe: 'response' })
            .pipe(
                map((data) => {
                    console.log("CUCUCUCUUCU ===> " + data);
                    
                    return data;
                }), 
                catchError( error => {
                    return throwError( 'Something went wrong!' );
                })
                /*
                map(data => {
                    console.log(data);

                    // TOKEN
                    let token = "aVEIOOOO "; //data.headers.get("Authorization");
                    sessionStorage.setItem('token', token);
                    console.log("TOKEN ===> " + token);


                    //if (data && token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(authUser));
                        this.currentUserSubject.next(authUser);
                        
                        console.log("Currente Usuário ===> " + localStorage.getItem('currentUser'));

                        //this.router.navigate(['https://www.google.com']);
                        //window.location.href = "" + data.body.urlOrigem;

                        //console.log("URL ====> " + data.urlOrigem);

                        //window.open("http://" + data.body.urlOrigem);
                    //}


                    return data;
                }),
                catchError((err: any) => {
                    // simple logging, but you can do a lot more, see below
                    console.error('An error occurred:', err.error);

                    
                        //expect(err.status).toEqual(404, 'status');
                        //expect(err.error).toEqual("deliberate 404 error", 'message');

                    return Observable.throw(err.statusText);
                })
                */
            );

    }

    create(resource: AuthUser): Observable<AuthUser> {
        console.log("[INFO][MÉTODO][BASE-RESOURCE.SERVICE] - [create][resource]: " + resource);
    
        
        const url = API_CONFIG.baseUrl_Guardian + "auth/ex/";
    
        return this.http.post(url, resource).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handleError)
        )
      }

   

    protected handleError(error: any): Observable<any>{
        console.log("[ERROR][MÉTODO][BASE-RESOURCE.SERVICE] - [ERRO NA REQUISIÇÃO]: ", error);
        return throwError(error);
      }

    get() {
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

    logOut() {
        sessionStorage.clear();
        localStorage.clear();

        sessionStorage.removeItem('token'),
        localStorage.removeItem('currentUser');
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