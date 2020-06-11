import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Auth, Login, UserProfile} from "../../@types/User";
import {StorageServices} from "../../helpers/StorageServices";
import {AUTH_KEY} from "../../helpers/Constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string
  userProfile: UserProfile;
  auth: Auth;
  constructor(private http: HttpClient, private storageServices: StorageServices) {
    this.baseUrl= environment.baseUrl
    if(this.storageServices.get(AUTH_KEY)) {
      this.auth= JSON.parse(this.storageServices.get(AUTH_KEY))
      this.userProfile={
        username: this.auth.username,
        roles: this.auth.roles.join(',')
      }
    }
  }

  login(data: Login){
    return this.http.post(this.baseUrl+'/login', data)
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
}
