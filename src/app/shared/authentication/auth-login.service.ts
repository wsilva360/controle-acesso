import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_CONFIG } from 'src/app/config/api.config';

import { AuthUser } from '../authentication/auth-user.model';


export class User{
    constructor(
        public status:string,
    ) {}
  
}

export class JwtResponse{
    constructor(
        public jwttoken:string,
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
        private router: Router,
        private http: HttpClient
    ) { 
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    // MÉTODOS PÚBLICOS
    authenticate(authUser: AuthUser) {

        console.log("[INFO][AUTH-LOGIN] - [AUTHENTICATE]: ", authUser);
        
        return this.http.post<any>(API_CONFIG.baseUrl_Guardian + "login", authUser).subscribe(
            
            userData => {
            
                console.log("ENTROU");


                

                //if (userData && userData.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(authUser));
                    this.currentUserSubject.next(authUser);
                    
                    // Remover depois
                    //localStorage.setItem('user.cpf', '363.795.558-03');
                    //localStorage.setItem('user.nome', 'RAFAEL CUINTO');

                    // TOKEN
                    let tokenStr= 'Bearer ' + userData.token;
                    sessionStorage.setItem('token', tokenStr);

                    localStorage.setItem('user.idBeneficiario', userData.idBeneficiario);
                    localStorage.setItem('user.nome', userData.nome);
                    localStorage.setItem('user.cpf', userData.cpf);
                    localStorage.setItem('user.carteira', userData.carteira);
                    localStorage.setItem('user.dataNascimento', userData.dataNascimento);
                    //localStorage.setItem('user.ativo', userData.ativo);
                    

                    //this.loggedIn.next(true);

                    this.router.navigate(['/dashboard']);


                //}

                console.log("TOKEN ************* === " + tokenStr);
                console.log("[INFO][AUTH][ID-BENEFICIARIO]: " + localStorage.getItem('user.idBeneficiario'));
                console.log("[INFO][AUTH][CPF]: " + userData.cpf);
                console.log("[INFO][AUTH][CPF CACHE]: " + localStorage.getItem('user.cpf'));

                return userData;
            
            }
            
        );
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
        localStorage.removeItem('user.idBeneficiario');
        localStorage.removeItem('user.nome');
        localStorage.removeItem('user.cpf');
        localStorage.removeItem('user.carteira');
        localStorage.removeItem('user.dataNascimento');
    }
    
}