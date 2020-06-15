import { Injectable } from '@angular/core';
import {Login} from "../../@types/User";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ServicesService {
  baseUrl: string
  constructor(private http: HttpClient) {
    this.baseUrl= environment.baseUrl
  }
  userServices(){
    console.log("===============")
    return this.http.get(this.baseUrl+'/services')
  }

  createServices(data: any){
    return this.http.post(this.baseUrl+'/services', data)
  }
  updateServices(id: string, data: any){
    return this.http.post(this.baseUrl+'/services/'+id, data)
  }
}
