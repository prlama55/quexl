import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()

// inside injectible  // providedIn: 'root'

export class DatasetService {
  baseUrl: string
  constructor(private http: HttpClient) {
    this.baseUrl= environment.baseUrl
  }
  userDataset(){
    console.log("===============")
    return this.http.get(this.baseUrl+'/datasets')
  }

  createDataset(data: any){
    return this.http.post(this.baseUrl+'/datasets', data)
  }
  updateDataset(id: string, data: any){
    return this.http.post(this.baseUrl+'/datasets/'+id, data)
  }
}
