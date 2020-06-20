import { Component, OnInit } from '@angular/core';
import {DatasetService} from "../../dataset/dataset.service";

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {
  showDropDown: boolean= false
  datasets: any
  constructor(private datasetServices:DatasetService,) { }

  ngOnInit(): void {
    this.datasetServices.userDataset().subscribe((datasets: DatasetService) => {
      this.datasets = datasets
    })
  }

}
