import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  q    :string;
  type : string;
  curPage : number;
  pageLength :number;
  uid : string;
  imageToShow: any;
  isImageLoading : boolean;
  totalPages : number;
  itemToBeDeleted : string;
  todayDate: Date;

  public menu = [];
  public cart = [];
  constructor(private _foodservice: FoodService,
              private _router: Router,
              private _authService: AuthService,
              private _flashMessages : FlashMessagesService
              ) { }

  ngOnInit() {
    this.type = null;
		this.q = "";
		this.pageLength =12;
    this.fetchFoods();
    // this._foodservice.getMenu()
    // .subscribe(
    //   data => this.menu = data,
    //   err => {
    //     if (err instanceof HttpErrorResponse){
    //       if(err.status === 401){
    //         this._router.navigate(['/login']);
    //       }
    //     }
    //   });
  }

  fetchFoods(){
		var q = this.q;
		if(this.q == ""){
			q = "all";
		}
    
    var loopIdx = 0;
		console.log("q "+ this.q + " type "+ this.type);

		this._foodservice.getMenu()
    .subscribe(
      data => this.menu = data,
      err => {
        if (err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login']);
          }
        }
      });

    this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data=>{ 
      this.cart = data,
      console.log(" CART ITEMS "+this.cart);
    });
  }
  
  AddToCart(fid){
    console.log("clicked item: "+fid+" for user id"+ localStorage.getItem("user_id"));
    this._foodservice.addToCart(fid,localStorage.getItem("user_id")).subscribe((info : any) =>{
      console.log(info);
      if (info.success){
        console.log(info.message);
        this._flashMessages.show("Successfully added to cart",{cssClass : "alert-success", timeout: 1000});
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data=>{ 
          this.cart = data,
          console.log(this.cart);
        });
        //this.cartComponent.ngOnInit();
      }else{
        this._flashMessages.show("Failed to insert to cart",{cssClass : "alert-danger", timeout: 2500});

      }
    })
    
  }

  DeleteFromCart(fid,cost,quantity,total){
    var total_cost = total - (cost * quantity);
    //quantity = 0;its made 0 for delete
    var info={quantity:0,
              total_cost:total_cost};
    console.log("clicked item: "+fid+" for user id"+ localStorage.getItem("user_id"));
    this._foodservice.DeleteFromCart(fid,localStorage.getItem("user_id"),info).subscribe((info : any) =>{
      console.log(info);
      if (info.success){
        console.log(info.message);
        this._flashMessages.show("Successfully deleted cart",{cssClass : "alert-success", timeout: 1000});
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data=>{ 
          this.cart = data,
          console.log("CART--> "+this.cart);
        });
        //this.cartComponent.ngOnInit();
      }else{
        this._flashMessages.show("Failed to delete from cart",{cssClass : "alert-danger", timeout: 2500});

      }
    })

  }

  // UpdateCart(){

  // }

}
