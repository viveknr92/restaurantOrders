import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  _url = "http://localhost:3000/api/menu/all/all";
  constructor( private _http : HttpClient) { }

  getMenu():Observable<Menu[]>  {
    console.log(this._url);
  	return this._http.get<Menu[]>(this._url);   
  }

  getCartQuantById(fid,uid){
     return this._http.get<Menu>('http://localhost:3000/api/cart/'+uid+'/'+fid);
  }

  addToCart(fid,uid){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this._http.post('http://localhost:3000/api/cart/'+ uid +'/'+ fid,{headers:headers});  	
  }

  UpdateCart(fid,uid,info){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("in food service "+info.quantity+ " "+info.newtotal);
  	return this._http.put('http://localhost:3000/api/cart/'+ uid +'/'+ fid, info);
  }

  getCart(uid):Observable<Cart[]>{
  	return this._http.get<Cart[]>('http://localhost:3000/api/cart/'+uid);
  }

}
