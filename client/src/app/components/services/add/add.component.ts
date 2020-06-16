import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesService} from "../services.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddServiceComponent implements OnInit {

  errorMessage: string
  serviceForm: FormGroup
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private servicesService: ServicesService
  ) {
    this.serviceForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }
  createFormGroup() {
    return this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  addService(){
    console.log("===",this.serviceForm.value)
    this.servicesService.createServices(this.serviceForm.value)
        .subscribe(user=>{
      this.router.navigate(['/services'])
    },error => {
          this.errorMessage= error.message
        })
  }
}
