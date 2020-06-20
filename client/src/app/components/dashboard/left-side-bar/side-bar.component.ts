import { Component, OnInit } from '@angular/core';
import {Services} from "../../../@types/Services";
import {ServicesService} from "../../services/services.service";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  services: Services
  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.userServices().subscribe((services: Services)=>{
      this.services= services
    })
  }

}
