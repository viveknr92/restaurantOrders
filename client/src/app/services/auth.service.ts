import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role : any;
  // private _registerurl = this._remoteAddress + "/api/users/register"
  // private _loginurl = this._remoteAddress + "/api/users/login"
  // private _checkusernameurl = this._remoteAddress + "/api/users/checkusername/";
  // private _checkemailurl = this._remoteAddress + "/api/users/checkemail/";
  constructor(private http: HttpClient, private globals : Globals) { }

  checkusername(name){
    return this.http.get<any>(`/api/users/checkusername/` + name);
  }

  checkemail(email){
    return this.http.get<any>(`/api/users/checkemail/` + email);
  }

  storeUserRole(role){
     console.log("IN AUTH SERVICE--------"+role);
     this.role = role;
     if(role == "admin"){
       this.globals.admin = true;
     }
     else{
       this.globals.admin = false;
       console.log(this.globals.admin);
     }    
   }

  registerUser(userInfo){
    return this.http.post<any>(`/api/users/register`, userInfo)
  }

  LoginUser(LoginInfo){
    return this.http.post<any>(`/api/users/login`, LoginInfo)
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getUser(){
    return localStorage.getItem("username");
  }

  getHostName(){
    return sessionStorage.getItem("hostname");
  }

  logoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    sessionStorage.removeItem("hostname");
  }

  
}
