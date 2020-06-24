import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Dataset} from "../../../@types/Dataset";
import {DatasetService} from "../../dataset/dataset.service";
import {DashboardService} from "../dashboard.service";
import {HistoryElement, UserHistory} from "../../../@types/History";

@Component({
    selector: 'app-right-side-bar',
    templateUrl: './right-side-bar.component.html',
    styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {
    @Input() datasets: Dataset[]
    histories: HistoryElement[]
    pendings: HistoryElement[]
    inprogress: HistoryElement[]
    completed: HistoryElement[]
    requested: HistoryElement[]
    filterBy: string = ''

    constructor(
        private datasetService: DatasetService,
        private dashboardService: DashboardService
    ) {
        this.dashboardService.getHistory().subscribe(history => {
            if (history) {
                let histories = this.histories
                this.histories = [history, ...histories]
            }
        })
    }

    ngOnInit(): void {
        this.refresh()
    }

    filterList(status = '') {
        this.pendings = []
        this.inprogress = []
        this.completed = []
        switch (status) {
            case 'Pending':
                this.pendings = this.histories.filter((data) => {
                    return data.status === 'Pending'
                })
                break;
            case 'In progress':
                this.inprogress = this.histories.filter((data) => {
                    return data.status === 'In progress'
                })
                break;
            case 'Completed':
                this.completed = this.histories.filter((data) => {
                    return data.status === 'Completed'
                })
                break;
            default:
                this.pendings = this.histories.filter((data) => {
                    return data.status === 'Pending'
                })
                this.inprogress = this.histories.filter((data) => {
                    return data.status === 'In progress'
                })
                this.completed = this.histories.filter((data) => {
                    return data.status === 'Completed'
                })
                break;
        }
    }

    filter(e) {
        this.filterBy = e.target.value
        this.filterList(e.target.value)
    }

    refresh(): void {
        this.datasetService.histories().subscribe((histories: UserHistory) => {
            this.histories = histories.buyerHistory
            this.requested = histories.sellerHistory.filter(data => {
                return data.status === 'Pending'
            })
            this.filterList()
        })
        this.filterBy = ''
    }

    acceptOffer(history: HistoryElement, status: string) {
        history.status = status
        this.datasetService.saveLaunchService(history).subscribe(history => {
            this.refresh()
        })
    }
}
