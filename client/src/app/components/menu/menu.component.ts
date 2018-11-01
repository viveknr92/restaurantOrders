import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu = [];
  constructor(private _foodservice: FoodService) { }

  ngOnInit() {
    this._foodservice.getMenu()
    .subscribe(
      data => {this.menu = data; console.log(data)},
      err => {console.log(err)});
  }

}
