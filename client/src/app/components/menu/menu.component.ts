import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu = [];
  constructor(private _foodservice: FoodService, private _router: Router) { }

  ngOnInit() {
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
  }

}
