import {Component, Input, OnInit} from '@angular/core';
import {Services} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() services: Services[]
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

  }
  selectedService(service: Services): void{
    this.dashboardService.setServiceData(service)
  }
}
