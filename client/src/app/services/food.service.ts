import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  _url = "http://localhost:3000/api/menu";
  constructor( private _http : HttpClient) { }

  getMenu():Observable<Menu[]>  {
    console.log(this._url);
  	return this._http.get<Menu[]>(this._url);   
  }
}
