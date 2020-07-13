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
  constructor( private _http : HttpClient) { }

  getAvailableFood(fid):Observable<any>{
    return this._http.get<any>('/api/menu/'+fid);       
  } 

  getMenu():Observable<Menu[]>  {
  	return this._http.get<Menu[]>('/api/menu/all/all');   
  }

  getCartQuantById(fid,uid){
     return this._http.get('/api/cart/'+uid+'/'+fid);
  }

  addNewItem(newItem){
    return this._http.post<any>('/api/menu', newItem);
      // .map(res =>res.json());  
  }

  deleteItem(fid){
    return this._http.delete('/api/menu/'+ fid); 
  }

  editItem(editedItem){
    return this._http.put('/api/menu/'+ editedItem._id,editedItem); 
  }  

  addToCart(fid,uid){
  	return this._http.post('/api/cart/'+ uid +'/'+ fid, null);  	
  }

  UpdateCart(fid,uid,info){
    console.log("In FS ------------------"+info.quantity);
  	return this._http.put('/api/cart/'+ uid +'/'+ fid, info);
  }

  getCart(uid):Observable<Cart>{
  	return this._http.get<Cart>('/api/cart/'+uid);
  }

  fetchImage(name:string): Observable<Blob>{
    //return this._http.get('https://picsum.photos/200/300/?random',{ responseType: 'blob' });
    return this._http.get('/api/menu/image/'+ name,{ responseType: 'blob' });
  }
  
  PlaceOrder(uid){
    return this._http.post('/api/order/'+uid, null);
  }

  ViewOrders(uid):Observable<Order>{
    return this._http.get<Order>('/api/order/'+uid);
  }

  searchItem(item_type, item_name):Observable<Menu[]>{
    return this._http.get<Menu[]>('/api/menu/'+ item_type + "/" + item_name);
  }

  public uploadFile(fileToUpload: File,fid) {
    const item_image = new FormData();
    console.log(fileToUpload);
    item_image.append('item_image', fileToUpload,fileToUpload.name);   
    return this._http.post<any>('/api/menu/image/'+fid, item_image); //note: no HttpHeaders passed as 3d param to POST!
                                             //So no Content-Type constructed manually.
                                             //Angular 4.x-6.x does it automatically.
  }

}
