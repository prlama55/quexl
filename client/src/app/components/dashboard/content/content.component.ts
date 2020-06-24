import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../../../@types/Services";
import {DashboardService} from "../dashboard.service";
import {Dataset} from "../../../@types/Dataset";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DatasetService} from "../../dataset/dataset.service";
import {HistoryElement} from "../../../@types/History";


@Component({
    selector: 'app-dashboard-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    @Input() datasets: Dataset[]
    service: Service;
    launchServiceFrom: FormGroup;
    errorMessage: string
    acceptForm: FormGroup
    history: HistoryElement

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dashboardService: DashboardService,
        private datasetService: DatasetService
    ) {
        this.dashboardService.getService().subscribe(service => {
            this.service = service
        })
        this.datasetService.getHistory().subscribe(history => {
            this.history = history
        })

        this.createFormGroup()
    }

    ngOnInit(): void {
    }

    createFormGroup() {
        this.launchServiceFrom = this.fb.group({
            dataset: ['', Validators.required],
        });
        this.acceptForm = this.fb.group({
            comment: ['', Validators.required],
            outputDataset: [''],
        });

    }

    launchService() {
        const dataset = this.launchServiceFrom.value.dataset
        console.log("dataset====",dataset)
        const data = {
            seller: this.service.seller.id,
            buyer: dataset.buyer.id,
            service: this.service.id,
            dataset: dataset.id
        }
        console.log("data====",data)

        this.datasetService.saveLaunchService(data)
            .subscribe((history: HistoryElement) => {
                this.dashboardService.setHistory(history)
                this.dashboardService.clearService()
                this.errorMessage = "Service Successfully lunched."
            }, error => {
                this.dashboardService.clearHistory()
                this.errorMessage = error.message
            })
    }

    accept() {
        let history = this.history
        history.comment = this.acceptForm.value.comment
        history.outputDataset = this.acceptForm.value.outputDataset
        this.datasetService.updateHistory(this.history.id,history)
            .subscribe((history: HistoryElement) => {
                this.dashboardService.setHistory(history)
                this.dashboardService.clearService()
                this.errorMessage = history.status==='COMPLETED'?'Submitted':"Accepted"
                this.dashboardService.clearHistory()
            }, error => {
                this.dashboardService.clearHistory()
                this.errorMessage = error.message
            })
    }
}
