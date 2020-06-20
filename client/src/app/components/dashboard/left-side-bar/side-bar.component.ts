import {Component, Input, OnInit} from '@angular/core';
import {Services} from "../../../@types/Services";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() services: Services
  constructor() { }

  ngOnInit(): void {

  }

}
