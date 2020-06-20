import {Component, Input, OnInit} from '@angular/core';
import {Services} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";
import {Dataset} from "../../../@types/Dataset";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'app-dashboard-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    @Input() datasets: Dataset[]
    service: Services;
    launchServiceFrom: FormGroup;
    errorMessage: string


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dashboardService: DashboardService
    ) {
        this.dashboardService.getService().subscribe(service => {
            this.service = service
        })
        {
            this.launchServiceFrom = this.createFormGroup()
        }
    }

    ngOnInit(): void {
    }

    createFormGroup() {
        return this.fb.group({
            dataset: ['', Validators.required],
        });
    }

    launchService(service: Services) {
        console.log("Launching service", service)
        this.dashboardService.saveLaunchService(this.launchServiceFrom.value)
            .subscribe(user=>{
                this.router.navigate(['/dashbaord'])
            },error => {
                this.errorMessage= error.message
            })
    }

    saveLaunchService(){

    }
}
