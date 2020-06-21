import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import {environment} from "../../environments/environment";
import {catchError, map, retry} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const auth = this.authenticationService.authValue;
        const isLoggedIn = auth && auth.access_token;
        console.log("isLoggedIn===>>>>",isLoggedIn)
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${auth.access_token}` }
            });
        }
        request = request.clone({
            setHeaders:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return next.handle(request);
    }
}
