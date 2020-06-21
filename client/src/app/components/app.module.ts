import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms'
import {LoginService} from "./user/login.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {StorageServices} from "../helpers/StorageServices";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AlertModule} from "ngx-bootstrap/alert";
import {CollapseModule} from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {JwtInterceptor} from "../helpers/jwt.interceptor";
import {ErrorInterceptor} from "../helpers/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [
    LoginService,
    StorageServices,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
