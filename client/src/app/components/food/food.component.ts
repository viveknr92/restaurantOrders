import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [FoodService]
})
export class FoodComponent implements OnInit {
  image: string;
  name: string;
  type: string;
  price: number;
  availability: string;
  menu: Menu;

  constructor(private foodService: FoodService, private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.menu = {
      _id: null,
      item_name: null,
      item_cost: null,
      item_type: null,
      item_availability: null,
      item_image: null
    };
  }

  addNewItem(e) {
    e.preventDefault();
    console.log("Here");
    console.log(this.name);
    // if (this.image == undefined)
    //   this.image = null;
    this.menu.item_name = this.name;
    this.menu.item_type = this.type;
    this.menu.item_cost = this.price;
    this.menu.item_availability = "Y";
    console.log(this.menu.item_cost);
    this.foodService.addNewItem(this.menu).subscribe(info => {
      console.log(info);
      // if (info.success) {
        // console.log(info.message);
        this.flashMessages.show("Successfully added to cart", { cssClass: "alert-success", timeout: 500 });
        this.router.navigate(['/menu']);
      // } else {
      //   this.flashMessages.show("Failed to add item " + info.message, { cssClass: "alert-danger", timeout: 500 });

      // }
    })
  }

}
