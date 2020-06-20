import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SideBarComponent} from './left-side-bar/side-bar.component';
import {RightSideBarComponent} from './right-side-bar/right-side-bar.component';
import {ContentComponent} from './content/content.component';
import {DatasetService} from "../dataset/dataset.service";
import {ServicesService} from "../services/services.service";
import {DashboardService} from "./dashboard.service";

@NgModule({
    declarations: [DashboardComponent, SideBarComponent, RightSideBarComponent, ContentComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    providers: [
        DatasetService,
        ServicesService,
        DashboardService
    ]
})
export class DashboardModule {
}
