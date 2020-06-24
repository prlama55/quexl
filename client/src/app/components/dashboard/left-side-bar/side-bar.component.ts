import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() services: Service[]
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

  }
  selectedService(service: Service): void{
    this.dashboardService.setServiceData(service)
  }
}
