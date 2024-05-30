import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { userModel } from '../../models/user.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserManagerService {


  constructor(private cookies: CookieService) { }

  setUserData(userData:userModel){
    let userInfoStr:string = JSON.stringify(userData);
    this.cookies.set("userInfo",userInfoStr);
    localStorage.setItem("login","true")
  }


  private getToken() {
    return this.cookies.get("token");
  }

  getUserData (): userModel{

    let userInfoStr:string = this.cookies.get("userInfo")
    let userInfo:userModel = JSON.parse(userInfoStr)

    return userInfo;
  }

  getUserLogged():string {
    const token = this.getToken();
    return token
  }

  getLoginState(){

    if(this.cookies.get("token")) return localStorage.getItem("login")
    return false
  }
}
