import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {HistoryElement} from "../../@types/History";

@Injectable()
export class DatasetService {
  private selectedHistory = new Subject<HistoryElement>();
  baseUrl: string
  constructor(private http: HttpClient) {
    this.baseUrl= environment.baseUrl
  }
  userDataset(){
    return this.http.get(this.baseUrl+'/datasets')
  }

  createDataset(data: any){
    return this.http.post(this.baseUrl+'/datasets', data)
  }
  updateDataset(id: string, data: any){
    return this.http.post(this.baseUrl+'/datasets/'+id, data)
  }
 updateHistory(id: string, data: any){
    return this.http.put(this.baseUrl+'/histories/'+id, data)
  }

  saveLaunchService(data) {
    return this.http.post(this.baseUrl + '/histories', data)
  }

  histories() {
    return this.http.get(this.baseUrl + '/histories')
  }

  setHistory(history: HistoryElement){
    this.selectedHistory.next(history)
  }
  getHistory(): Observable<HistoryElement> {
    return this.selectedHistory.asObservable();
  }
}
