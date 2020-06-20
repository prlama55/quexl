import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Services} from "../../@types/Services";

@Injectable({ providedIn: 'root' })
export class DashboardService {
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
}
