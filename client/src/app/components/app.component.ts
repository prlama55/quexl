import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import {LoginService} from "./user/login.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quexl';

  constructor(private loginService: LoginService) {
    setTheme('bs4'); // or 'bs3'

  }
}
