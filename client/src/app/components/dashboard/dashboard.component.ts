import { Component, OnInit } from '@angular/core';
import {StorageServices} from "../../helpers/StorageServices";
import {LoginService} from "../user/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

}
