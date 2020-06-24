import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Auth, Login, UserProfile,Register} from "../../@types/User";
import {StorageServices} from "../../helpers/StorageServices";
import {AUTH_KEY} from "../../helpers/Constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string
  userProfile: UserProfile;
  auth: Auth;
  constructor(private http: HttpClient) {
    this.baseUrl= environment.baseUrl
    if(StorageServices.get(AUTH_KEY)) {
      this.auth= JSON.parse(StorageServices.get(AUTH_KEY))
      this.userProfile={
        username: this.auth.username,
        roles: this.auth.roles.join(',')
      }
    }
  }

  login(data: Login){
    return this.http.post(this.baseUrl+'/login', data)
  }

  register(data: Register){
    return this.http.post(this.baseUrl+'/users', data)
  }

  logout(){
    return this.http.post(this.baseUrl+'/logout', {})
  }

  isLoggedIn(): boolean{
    if(this.auth) return true;
    else return false;
  }

  getUserProfile(): UserProfile{
    return  this.userProfile;
  }

  getToken(){
    const data={
      refresh_token: this.auth.refresh_token,
      grant_type: 'refresh_token'
    }
    return this.http.post(this.baseUrl.replace('api','oauth')+'/access_token', {},{params:data})
  }
}
