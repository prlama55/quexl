import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Services} from "../../@types/Services";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class DashboardService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl

    }

    private service = new Subject<Services>();
    private dataset = new Subject<any>();

    setServiceData(service: Services) {
        this.service.next(service);
    }

    clearService() {
        this.service.next();
    }

    getService(): Observable<Services> {
        return this.service.asObservable();
    }

    saveLaunchService(data) {
        return this.http.post(this.baseUrl + '/userServices', data)
    }
}
