import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const auth = this.authenticationService.authValue;
        if (auth) {
            console.log("====if==auth")
            // logged in so return true
            return true;
        } else {
            console.log("====else==auth")
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
