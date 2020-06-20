import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {
  showDropDown: boolean= false
  @Input() datasets: any
  constructor() { }

  ngOnInit(): void {

  }

}
