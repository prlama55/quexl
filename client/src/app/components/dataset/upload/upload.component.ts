import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesService} from "../../services/services.service";
import {DatasetService} from "../dataset.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  errorMessage: string
  datasetForm: FormGroup

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private servicesService: DatasetService
  ) {
    this.datasetForm = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  createFormGroup() {
    return this.fb.group({
      dataFormat: ['', Validators.required],
      dataString: ['', Validators.required]
    });
  }


    addDataset() {
    console.log("===",this.datasetForm.value)
    this.servicesService.createDataset(this.datasetForm.value)
        .subscribe(user=>{
          this.router.navigate(['/datasets'])
        },error => {
          this.errorMessage= error.message
        })
  }


}
