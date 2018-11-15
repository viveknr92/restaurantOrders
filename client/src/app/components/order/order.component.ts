import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    
  public orders = [];

  constructor(private _foodservice: FoodService,
    private _router: Router,
    private _flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this._foodservice.ViewOrders(localStorage.getItem("user_id")).subscribe((info: any) => {
      this.orders= info,
      console.log(this.orders);
     
  })
  }

}
