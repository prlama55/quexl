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
    constructor(private storageServices: StorageServices) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth: Auth;

        if(this.storageServices.get('token')){
            auth= JSON.parse(this.storageServices.get('token'))
        }
        if (auth) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + auth.access_token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

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
