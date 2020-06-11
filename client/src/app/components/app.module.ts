import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import {QuexlHttpInterceptor} from "../http/intercepter/quexl.http.interceptor";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AlertModule} from "ngx-bootstrap/alert";
import {CollapseModule} from "ngx-bootstrap/collapse";

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
    CollapseModule.forRoot()
  ],
  providers: [
    LoginService,
    StorageServices,
    { provide: HTTP_INTERCEPTORS, useClass: QuexlHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
