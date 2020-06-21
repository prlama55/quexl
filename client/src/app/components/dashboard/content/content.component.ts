import {Component, Input, OnInit} from '@angular/core';
import {Services} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";
import {Dataset} from "../../../@types/Dataset";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DatasetService} from "../../dataset/dataset.service";
import {UserHistory} from "../../../@types/UserHistory";


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
        private dashboardService: DashboardService,
        private datasetService: DatasetService
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

    launchService() {
        const dataset=this.launchServiceFrom.value.dataset
        const data={
            seller: this.service.seller.id,
            buyer: dataset.buyer.id,
            service: this.service.id,
            dataset:dataset.id
        }
        this.datasetService.saveLaunchService(data)
            .subscribe((history: UserHistory)=>{
                this.dashboardService.setHistory(history)
                this.dashboardService.clearService()
                this.errorMessage= "Service Successfully lunched."
            },error => {
                this.dashboardService.clearHistory()
                this.errorMessage= error.message
            })
    }

}
