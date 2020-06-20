import {Component, Input, OnInit} from '@angular/core';
import {Services} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";

@Component({
    selector: 'app-dashboard-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    service: Services

    constructor(private dashboardService: DashboardService) {
        this.dashboardService.getService().subscribe(service => {
            this.service = service
        })
    }

    ngOnInit(): void {
    }

}
