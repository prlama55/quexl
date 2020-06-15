import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {StorageServices} from "../../helpers/StorageServices";
import {Auth} from "../../@types/User";

@Injectable()
export class QuexlHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth: Auth;
        let token=StorageServices.get('auth')
        if(token){
            auth= JSON.parse(token)
        }
        console.log("token====",token)
        console.log("auth====",auth)
        if (auth) {
            request = request.clone({
                setHeaders:{
                    'Authorization': 'Bearer ' + auth.access_token
                }
            });
        }
        request = request.clone({
            setHeaders:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    message: error.status===401?"Unauthorized": error.message,
                    status: error.status
                };
                return throwError(data);
            }));
    }
}
