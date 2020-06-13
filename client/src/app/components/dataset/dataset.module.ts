import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatasetComponent} from "./dataset.component";
import { UploadComponent } from './upload/upload.component';
import {DatasetRoutingModule} from "./dataset-routing.module";

@NgModule({
  declarations: [DatasetComponent, UploadComponent],
  imports: [
    CommonModule,
    DatasetRoutingModule
  ]
})
export class DatasetModule { }
