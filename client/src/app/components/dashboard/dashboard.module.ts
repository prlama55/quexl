import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { SideBarComponent } from './left-side-bar/side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [DashboardComponent, SideBarComponent, RightSideBarComponent, ContentComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
