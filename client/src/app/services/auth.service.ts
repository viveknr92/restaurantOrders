import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _registerurl = "hhtp://localhost:3000/api/users"
  constructor(private http: HttpClient) { }

  registerUser(userInfo){
    return this.http.post<any>(this._registerurl, userInfo)
  }
  
}
