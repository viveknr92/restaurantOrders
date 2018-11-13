import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _registerurl = "http://localhost:3000/api/users/register"
  private _loginurl = "http://localhost:3000/api/users/login"
  constructor(private http: HttpClient) { }

  registerUser(userInfo){
    return this.http.post<any>(this._registerurl, userInfo)
  }

  LoginUser(LoginInfo){
    return this.http.post<any>(this._loginurl,LoginInfo)
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

  logoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }
  
}
