import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthService } from '../../services/auth.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Globals } from '../../global';
import { Menu } from 'src/app/models/menu';
import * as $ from 'jquery';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap';
//import {Cart} from '../../models/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  itemSearchName: string;
  itemSearchType: string;
  food: Menu;
  curPage: number;
  pageLength: number;
  uid: string;
  imageToShow: any;
  isImageLoading: boolean;
  totalPages: number;
  itemToBeDeleted: string;
  todayDate: Date;
  // modalRef: BsModalRef;
  //cart: Cart;
  curPagefoods : Menu[];
  dispfoods : Menu[];

  public menu = [];
  public cart = {};
  public temp = {
    quantity: Number,
    _id: String,
    menu: String
  }
  public prev_quant;

  constructor(private _foodservice: FoodService,
    private _router: Router,
    private _authService: AuthService,
    private _flashMessages: FlashMessagesService,
    private globals: Globals,
    // private modalService : BsModalService
  ) { }

  ngOnInit() {
    this.itemSearchType = "all";
    this.itemSearchName = "";
    this.pageLength = 6;
    this._authService.storeUserRole(localStorage.getItem("role"));
    this.fetchFoods();
  }

  fetchFoods() {
    let item_name = this.itemSearchName;
    if (this.itemSearchName == "") {
      item_name = "all";
    }

    this._foodservice.searchItem(this.itemSearchType, item_name).subscribe(data => {
          let m: Menu[];
          let loopIdx = 0;
          m = data;
          console.log(m);
          this.dispfoods = [];
          this.menu = [];
          console.log(this.globals.admin);
          if (localStorage.getItem("role") === "admin") {
                this.menu = m;
          } 
          else {
              m.forEach((mn, idx, m) => {
                  if (mn.item_availability == 'Y') {
                      this.menu.push(mn);
                  }
              })
          }
          //this.menu = data;
          console.log(this.menu);
          this.menu.forEach((m, idx, menu) => {
                let item_image_name = m.item_image;
                m.item_image = null;
                this.getImageFromService(item_image_name, idx);
                //this.foods.push(newFood);
                this.dispfoods.push(m);
                loopIdx = idx;
				        var parent = this;
        				if (loopIdx == this.dispfoods.length - 1) {
        					this.getFoodsPage(1);
        					this.buildPagination();
        				}
          }) // end of foreach
      });//food service subscribe

    this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data => {
      this.cart = data,
        console.log(" CART ITEMS " + this.cart);
    });//_foodservice.getCart

    console.log("GLOBALS-----------"+ this.globals.admin);
  }// end of fetch foods

  getFoodsPage(pageNum){
		$(".page-item").removeClass("active");

		switch(pageNum){
			case 1 : {
				$("#1").parent().addClass("active");
				break;
			}
			case 2 : {
				$("#2").parent().addClass("active");
				break;
			}
			case 3 : {
				$("#3").parent().addClass("active");
				break;
			}
			case 4 : {
				$("#4").parent().addClass("active");
				break;
			}
			case 5 : {
				$("#5").parent().addClass("active");
				break;
			}												
		}

		this.curPage = pageNum;
		this.curPagefoods = [];
		for(var i = (pageNum-1) * this.pageLength ; i < pageNum * this.pageLength && i < this.dispfoods.length ; i++){
			console.log("in loop "+i);
			this.curPagefoods.push(this.dispfoods[i]);
		}

  }// getFoodsPage
  
  buildPagination(){
		var parent = this;
		this.totalPages = Math.ceil(this.dispfoods.length / this.pageLength);
		$(".pagination").empty();
		$(".pagination").append('<li _ngcontent-c2 class="page-item "><a _ngcontent-c2 class="page-link" id = "prevPage" (click) = "prevPage()">&laquo;</a></li>');
			$("#prevPage").click(function(event){
				parent.prevPage();
			});					
		for(var i=1;i<=this.totalPages;i++){
			if(i==1){
				$(".pagination").append('<li _ngcontent-c2 class="page-item active"><a _ngcontent-c2 class="page-link" id = "'+i+'" >'+i+'</a></li>'); 
			}else{
				$(".pagination").append('<li _ngcontent-c2 class="page-item "><a _ngcontent-c2 class="page-link" id = "'+i+'" >'+i+'</a></li>'); 
			}
			$("#"+i).click(function(event){
				parent.getFoodsPage(parseInt(event.currentTarget.id));
			});
		}	
		$(".pagination").append('<li _ngcontent-c2 class="page-item"><a _ngcontent-c2 class="page-link" id = "nextPage" (click) = "nextPage()">&raquo;</a></li>');
			$("#nextPage").click(function(event){
				parent.nextPage();
			});	
  } //buildPagination
  
  prevPage(){
		if(this.curPage == 1){
			return;
		}else{
			this.getFoodsPage(this.curPage-1);
		}
	}
	nextPage(){
		if(this.curPage == this.totalPages){
			return;
		}
		else{
			this.getFoodsPage(this.curPage+1);
		}
	}	

  getImageFromService(image, idx) {
    this.isImageLoading = true;
    this._foodservice.fetchImage(image).subscribe(data => {
      console.log("fetchImage subscribe");
      this.isImageLoading = false;
      console.log(this.isImageLoading);
      this.createImageFromBlob(data, idx);
    }, error => {
      this.isImageLoading = false;
      console.log("Could not find file : " + this.isImageLoading);
    });
  }

  createImageFromBlob(image: Blob, idx) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader);
      this.menu[idx].item_image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  AddToCart(fid) {
    console.log("clicked item: " + fid + " for user id" + localStorage.getItem("user_id"));
    this._foodservice.addToCart(fid, localStorage.getItem("user_id")).subscribe((info: any) => {
      console.log(info);
      if (info.success) {
        console.log(info.message);
        //this._flashMessages.show("Successfully added to cart", { cssClass: "alert-success", timeout: 1000 });
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data => {
          this.cart = data,
            console.log("THIS>CART>>>>" + this.cart);
        });
        //this.cartComponent.ngOnInit();
      } else {
        this._flashMessages.show("Failed to insert to cart", { cssClass: "alert-danger", timeout: 2500 });

      }
    })

  }


  DeleteFromCart(fid) {

    var info;
    info = {
      quantity: 0
    };
    console.log("clicked item: " + fid + " for user id" + localStorage.getItem("user_id"));
    this._foodservice.UpdateCart(fid, localStorage.getItem("user_id"), info).subscribe((info: any) => {
      console.log(info);
      if (info.success) {
        console.log(info.message);
        //this._flashMessages.show("Successfully deleted cart", { cssClass: "alert-success", timeout: 1000 });
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data => {
          this.cart = data,
            console.log("CART--> " + this.cart);
        });
        //this.cartComponent.ngOnInit();
      } else {
        this._flashMessages.show("Failed to delete from cart", { cssClass: "alert-danger", timeout: 2500 });

      }
    })

  }
  UpdateCart(fid, quantity) {
    var info;
    info = {
      quantity: quantity
    };
    console.log("clicked item: " + fid + " for user id" + localStorage.getItem("user_id"));
    this._foodservice.UpdateCart(fid, localStorage.getItem("user_id"), info).subscribe((info: any) => {
      console.log(info);
      if (info.success) {
        console.log(info.message);
        //this._flashMessages.show("Successfully updated cart", { cssClass: "alert-success", timeout: 1000 });
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data => {
          this.cart = data,
            console.log("CART--> " + this.cart);
        });
        //this.cartComponent.ngOnInit();
      } else {
        this._flashMessages.show("Failed to update  cart", { cssClass: "alert-danger", timeout: 2500 });

      }
    })
  }

  PlaceOrder() {
    this._foodservice.PlaceOrder(localStorage.getItem("user_id")).subscribe((info: any) => {
      console.log(info);

      if (info.success) {
        console.log(info.message);
        this._flashMessages.show("Successfully placed order", { cssClass: "alert-success", timeout: 1000 });
        this._foodservice.getCart(localStorage.getItem("user_id")).subscribe(data => {
          this.cart = data,
            console.log("CART--> " + this.cart);
        });

      } else {
        this._flashMessages.show("Failed to place Order", { cssClass: "alert-danger", timeout: 2500 });
      }
    })


  }

  ViewOrders() {

    this._router.navigate(['order']);
  }

  deleteItem(fid) {
    this._foodservice.deleteItem(fid).subscribe(info => {
      // if (info.success == true) {
      // this.modalRef.hide();
      this._flashMessages.show("Successfully deleted Item ", { cssClass: "alert-success", timeout: 2000 });
      // this._router.navigate(['/menu']);
      this.fetchFoods();
      // } else {
      // this. _flashMessages.show("Something went wrong", { cssClass: "alert-danger", timeout: 2000 });
      // }
    })
  }
  
}

