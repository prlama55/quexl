import { Component, OnInit } from '@angular/core';
import {DatasetService} from "./dataset.service";
import {Dataset} from "../../@types/Dataset";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {

  datasets:Dataset[]

  constructor(private datasetServices:DatasetService ) { }

  ngOnInit(): void {
    this.datasetServices.userDataset().subscribe((datasets: Dataset[]) => {
      this.datasets = datasets
    })
  }

}
