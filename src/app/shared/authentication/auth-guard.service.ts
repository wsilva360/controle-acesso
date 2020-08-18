import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    // CONSTRUTOR
    constructor(
        private router: Router,
        private authLoginService: AuthLoginService
    ) { }


    // MÉTODOS PÚBLICOS
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {       
        console.log("[INFO][AUTH-GUARD-SERVICE] - [ROUTE]: " + route);
        console.log("[INFO][AUTH-GUARD-SERVICE] - [STATE]: " + state);

        // Verifica se está logado
        if (this.authLoginService.isUserLoggedIn()) {
            console.log("[AuthGuardService] - isUserLoggedIn = TRUE");
            
            return true;
        }

        console.log("isUserLoggedIn = FALSE");
        this.router.navigate(['/login']);        
        
        return false;
    }

}