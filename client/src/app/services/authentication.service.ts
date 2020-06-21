import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Auth} from '../@types/User';
import {environment} from "../../environments/environment";
import {StorageServices} from "../helpers/StorageServices";
import {AUTH_KEY} from "../helpers/Constants";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private authSubject: BehaviorSubject<Auth>;
    public auth: Observable<Auth>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

        if (StorageServices.get(AUTH_KEY)) {
            const auth = JSON.parse(StorageServices.get(AUTH_KEY))
            this.authSubject = new BehaviorSubject<Auth>(auth);
        } else {
            this.authSubject = new BehaviorSubject<Auth>(null);
        }
        this.auth = this.authSubject.asObservable();
    }

    public get authValue(): Auth {
        return this.authSubject.value;
    }

    login(data: any) {
        return this.http.post<any>(`${environment.baseUrl}/login`, data)
            .pipe(map(auth => {
                this.authSubject.next(auth);
                StorageServices.save(AUTH_KEY, JSON.stringify(auth))
                return auth;
            }));
    }

    logout() {
        this.authSubject.next(null);
        StorageServices.remove(AUTH_KEY)
        this.router.navigate(['/login']);
    }

    refreshToken(): Observable<Auth> {
        if(this.authValue){
            return this.http.post<Auth>(
                `${environment.baseUrl
                    .replace('api', 'oauth')
                }/access_token?grant_type=refresh_token&refresh_token=${this.authValue.refresh_token}`,
                {}
            ).pipe(map((auth) => {
                StorageServices.save(AUTH_KEY, JSON.stringify(auth))
                this.authSubject.next(auth);
                return auth;
            }));
        }else{
            return null
        }

    }

}
