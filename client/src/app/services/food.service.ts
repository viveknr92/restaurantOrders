import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
     return this._http.get('http://localhost:3000/api/cart/'+uid+'/'+fid);
  }

  addNewItem(newItem){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/menu', newItem);
      // .map(res =>res.json());  
  }

  addToCart(fid,uid){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this._http.post('http://localhost:3000/api/cart/'+ uid +'/'+ fid,{headers:headers});  	
  }

  UpdateCart(fid,uid,info){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("In FS ------------------"+info.quantity);
  	return this._http.put('http://localhost:3000/api/cart/'+ uid +'/'+ fid, info);
  }

  getCart(uid):Observable<Cart>{
  	return this._http.get<Cart>('http://localhost:3000/api/cart/'+uid);
  }

  fetchImage(name:string): Observable<Blob>{
    //return this._http.get('https://picsum.photos/200/300/?random',{ responseType: 'blob' });
    return this._http.get('http://localhost:3000/api/menu/image/'+ name,{ responseType: 'blob' });
  }
  
  PlaceOrder(uid){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/order/'+uid,{headers:headers});
  }

  ViewOrders(uid){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/api/order/'+uid);
  }

}
