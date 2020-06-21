import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {catchError, map, mergeMap, retry, switchMap} from 'rxjs/operators';

import {AuthenticationService} from '../services/authentication.service';
import {Auth} from "../@types/User";
import {StorageServices} from "./StorageServices";
import {AUTH_KEY} from "./Constants";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private tokenSubject: BehaviorSubject<string>;
    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient
    ) {
        this.tokenSubject= new BehaviorSubject<string>('')
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let req= request
        return next.handle(request)
            .pipe(
                catchError((err, retryRequest) => {
                    const error = (err && err.error && err.error.message) || err.statusText;
                    if ([401].includes(err.status) && this.authenticationService.authValue) {
                        // auto logout if 401 or 403 response returned from api
                        this.authenticationService.refreshToken().subscribe(auth=>{
                            console.log("auth.token====",this.authenticationService.authValue.access_token)
                            console.log("auth.token====",auth.access_token)
                            this.tokenSubject.next(auth.access_token)
                        })
                        console.log("this.tokenSubject.value====",this.tokenSubject.value)
                        req = request.clone({
                            setHeaders: {Authorization: `Bearer ${this.tokenSubject.value}`}
                        });
                        return next.handle(req)
                    } else {
                        return throwError(error);
                    }
                })
            )
    }
}
