import { Injectable } from '@angular/core';
import {Login} from "../../@types/User";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string
  constructor(private http: HttpClient) {
    this.baseUrl= environment.baseUrl
  }
  users(){
    return this.http.get(this.baseUrl+'/users')
  }
  register(data: any){
    return this.http.post(this.baseUrl+'/users', data)
  }
  resetPassword(id: string, data: any){
    return this.http.post(this.baseUrl+'/users/'+id, data)
  }
}
