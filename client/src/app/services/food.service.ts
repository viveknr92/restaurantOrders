import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Menu } from '../models/menu';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Globals } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _remoteAddress = `http://${this.globals.hostname}:3000`
  
  _url = this._remoteAddress + '/menu/all/all';
  constructor( private _http : HttpClient, private globals : Globals) { }

  getAvailableFood(fid):Observable<any>{
    var url = this._remoteAddress + '/menu/'+fid;
    console.log(url);
    return this._http.get<any>(url);       
  } 

  getMenu():Observable<Menu[]>  {
    console.log(this._url);
  	return this._http.get<Menu[]>(this._url);   
  }

  getCartQuantById(fid,uid){
     return this._http.get(this._remoteAddress + '/api/cart/'+uid+'/'+fid);
  }

  addNewItem(newItem){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post<any>(this._remoteAddress + '/api/menu', newItem);
      // .map(res =>res.json());  
  }

  deleteItem(fid){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete(this._remoteAddress + '/api/menu/'+ fid); 
  }

  editItem(editedItem){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this._remoteAddress + '/api/menu/'+ editedItem._id,editedItem); 
  }  

  addToCart(fid,uid){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this._http.post(this._remoteAddress + '/api/cart/'+ uid +'/'+ fid,{headers:headers});  	
  }

  UpdateCart(fid,uid,info){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("In FS ------------------"+info.quantity);
  	return this._http.put(this._remoteAddress + '/api/cart/'+ uid +'/'+ fid, info);
  }

  getCart(uid):Observable<Cart>{
  	return this._http.get<Cart>(this._remoteAddress + '/api/cart/'+uid);
  }

  fetchImage(name:string): Observable<Blob>{
    //return this._http.get('https://picsum.photos/200/300/?random',{ responseType: 'blob' });
    return this._http.get(this._remoteAddress + '/api/menu/image/'+ name,{ responseType: 'blob' });
  }
  
  PlaceOrder(uid){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._remoteAddress + '/api/order/'+uid,{headers:headers});
  }

  ViewOrders(uid):Observable<Order>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get<Order>(this._remoteAddress + '/api/order/'+uid);
  }

  searchItem(item_type, item_name):Observable<Menu[]>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get<Menu[]>(this._remoteAddress + '/api/menu/'+ item_type + "/" + item_name);
  }

  public uploadFile(fileToUpload: File,fid) {
    const item_image = new FormData();
    console.log(fileToUpload);
    item_image.append('item_image', fileToUpload,fileToUpload.name);   
    return this._http.post<any>(this._remoteAddress + '/api/menu/image/'+fid, item_image); //note: no HttpHeaders passed as 3d param to POST!
                                             //So no Content-Type constructed manually.
                                             //Angular 4.x-6.x does it automatically.
  }

}
