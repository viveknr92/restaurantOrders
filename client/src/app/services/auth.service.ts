import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role : any;
  private _registerurl = "http://localhost:3000/api/users/register"
  private _loginurl = "http://localhost:3000/api/users/login"
  constructor(private http: HttpClient, private globals : Globals) { }

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
    localStorage.removeItem("role");
  }
  
}
