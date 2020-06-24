import { Component, OnInit } from '@angular/core';
import {LoginService} from "../user/login.service";
import {Router} from "@angular/router";
import {Service, Services} from "../../@types/Services";
import {DatasetService} from "../dataset/dataset.service";
import {ServicesService} from "../services/services.service";
import {Dataset} from "../../@types/Dataset";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  services: Service
  datasets: Dataset[]
  constructor(
      private loginService: LoginService,
      private router: Router,
      private servicesService: ServicesService,
      private datasetServices:DatasetService,
  ) {
    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.servicesService.userServices().subscribe((services: Services)=>{
      console.log("services===",services)
      this.services= services.otherServices
    })
    this.datasetServices.userDataset().subscribe((datasets: Dataset[]) => {
      this.datasets = datasets
    })
  }
}
