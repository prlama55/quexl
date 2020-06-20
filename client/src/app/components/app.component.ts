import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import {LoginService} from "./user/login.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quexl';
  queryParam: any
  constructor(private activatedRoute: ActivatedRoute) {
    setTheme('bs4'); // or 'bs3'
    this.activatedRoute.queryParams.subscribe(queryParam=>{
      this.queryParam= queryParam
    })
  }
}
