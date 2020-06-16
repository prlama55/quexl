import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatasetComponent} from "./dataset.component";
import { UploadComponent } from './upload/upload.component';
import {DatasetRoutingModule} from "./dataset-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DatasetService} from "./dataset.service";

@NgModule({
  declarations: [DatasetComponent, UploadComponent],
  imports: [
    CommonModule,
    DatasetRoutingModule,
      ReactiveFormsModule
  ],
  providers:[
      DatasetService
  ]
})
export class DatasetModule { }
