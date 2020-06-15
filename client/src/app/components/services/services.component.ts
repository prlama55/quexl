import { Component, OnInit } from '@angular/core';
import {ServicesService} from "./services.service";
import {Services} from "../../@types/Services";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: Services
  constructor(private servicesService: ServicesService) {

  }

  ngOnInit(): void {
    this.servicesService.userServices().subscribe((services: Services)=>{
      this.services= services
    })
  }

}
