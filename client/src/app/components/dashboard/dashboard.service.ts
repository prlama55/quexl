import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Service} from "../../@types/Services";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HistoryElement} from "../../@types/History";

@Injectable({providedIn: 'root'})
export class DashboardService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl

    }

    private service = new Subject<Service>();
    private history = new Subject<HistoryElement>();

    setServiceData(service: Service) {
        this.service.next(service);
    }

    setHistory(history: HistoryElement) {
        this.history.next(history);
    }

    clearService() {
        this.service.next();
    }

    clearHistory() {
        this.service.next();
    }

    getService(): Observable<Service> {
        return this.service.asObservable();
    }
    getHistory(): Observable<HistoryElement> {
        return this.history.asObservable();
    }
}
