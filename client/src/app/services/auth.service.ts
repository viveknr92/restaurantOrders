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
  private _checkusernameurl = "http://localhost:3000/api/users/checkusername/";
  private _checkemailurl = "http://localhost:3000/api/users/checkemail/";
  constructor(private http: HttpClient, private globals : Globals) { }

  checkusername(name){
    return this.http.get<any>(this._checkusernameurl + name);
  }

  checkemail(email){
    return this.http.get<any>(this._checkemailurl + email);
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

  getUser(){
    return localStorage.getItem("username");
  }

  logoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  }

  
}
