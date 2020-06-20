import { Component, OnInit } from '@angular/core';
import {DatasetService} from "./dataset.service";
import {Services} from "../../@types/Services";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {

  datasets:any

  constructor(private datasetServices:DatasetService ) { }

  ngOnInit(): void {
    this.datasetServices.userDataset().subscribe((datasets: DatasetService) => {
      this.datasets = datasets
    })
  }

}
