import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServicesComponent} from "./services.component";
import { AddServiceComponent } from './add/add.component';
import {ServicesRoutingModule} from "./services-routing.module";
import {ServicesService} from "./services.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ServicesComponent, AddServiceComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    ServicesService
  ]
})
export class ServicesModule { }
