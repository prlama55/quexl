import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Services} from "../../@types/Services";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserHistory} from "../../@types/UserHistory";

@Injectable({providedIn: 'root'})
export class DashboardService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl

    }

    private service = new Subject<Services>();
    private history = new Subject<UserHistory>();

    setServiceData(service: Services) {
        this.service.next(service);
    }

    setHistory(history: UserHistory) {
        this.history.next(history);
    }

    clearService() {
        this.service.next();
    }

    clearHistory() {
        this.service.next();
    }

    getService(): Observable<Services> {
        return this.service.asObservable();
    }
    getHistory(): Observable<UserHistory> {
        return this.history.asObservable();
    }
}
