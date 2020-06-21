import {Component, Input, OnInit} from '@angular/core';
import {Dataset} from "../../../@types/Dataset";
import {DatasetService} from "../../dataset/dataset.service";
import {UserHistory} from "../../../@types/UserHistory";
import {DashboardService} from "../dashboard.service";

@Component({
    selector: 'app-right-side-bar',
    templateUrl: './right-side-bar.component.html',
    styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {
    showDropDown: boolean = false
    @Input() datasets: Dataset[]
    histories: UserHistory[]

    constructor(
        private datasetService: DatasetService,
        private dashboardService: DashboardService
    ) {
      this.dashboardService.getHistory().subscribe(history=>{
        if(history){
          let histories= this.histories
          this.histories=[history, ...histories]
        }
      })
    }

    ngOnInit(): void {
        this.datasetService.histories().subscribe((histories: any[]) => {
            this.histories = histories
        })
    }

}
