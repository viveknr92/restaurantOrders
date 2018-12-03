import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Menu } from 'src/app/models/menu';
import { AdminGuard } from 'src/app/guards/admin.guard'

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [FoodService]
})
export class FoodComponent implements OnInit {
  file: string;
  name: string;
  type: string;
  price: number;
  availability: string;
  menu: Menu;
  selectedFile = null;
  types = [];

  public newinfo = {
    menu_id:String,
    message:String
  };
  
 fileSelected: File

  constructor(private foodService: FoodService, private router: Router,
    private flashMessages: FlashMessagesService, private admin : AdminGuard) { }

  ngOnInit() {
    this.admin.canActivate();
    this.menu = {
      _id: null,
      item_name: null,
      item_cost: null,
      item_type: null,
      item_availability: null,
      item_image: null
    };

    this.types = [
      {name: 'Appetizers', value: 'appetizer'},
      {name: 'Soups and Salads', value: 'soup'},
      {name: 'Lunch Specials', value: 'lunch'},
      {name: 'Handcrafted Burgers', value: 'burger'},
      {name: 'Sandwiches and Tacos', value: 'sandwich'},
      {name: 'Pizza', value: 'pizza'},
      {name: 'Pastas', value: 'pasta'},
      {name: 'Deserts', value: 'desert'},
      {name: 'Beverages', value: 'beverage'}
    ];
    this.type = this.types[0].value;
  }

  addNewItem(e) {
    e.preventDefault();
    console.log("Here");
    console.log(this.name);
    if (this.menu.item_image == undefined)
      this.menu.item_image = null;
    this.menu.item_name = this.name;
    this.menu.item_type = this.type;
    this.menu.item_cost = this.price;
    this.menu.item_availability = "Y";
    console.log(this.menu.item_cost);
    this.foodService.addNewItem(this.menu).subscribe(info => {
      console.log(info);
      this.newinfo = info;
      console.log(this.newinfo.menu_id);
      // if (info.success) {
        // console.log(info.message);
        this.flashMessages.show("Successfully added to cart", { cssClass: "alert-success", timeout: 500 });
        this.router.navigate(['/menu']);
      // } else {
      //   this.flashMessages.show("Failed to add item " + info.message, { cssClass: "alert-danger", timeout: 500 });

      // }
        //function to 
      
    //console.log(this.file);
    this.foodService.uploadFile(this.fileSelected,this.newinfo.menu_id)
   .subscribe( (response) => {
      console.log('IMAGE UPLOADED TO DATABASE');
      return response;
    },
     (error) => {
       console.log('FAILED TO UPLOAD IMAGE TO DB');
     });
    })
  }

  onUploadFinished(event)  {
    console.log(event);
    console.log("FILE UPLOAD SUCCESSFUL");
    this.fileSelected = event.target.files[0];
  //   const fileSelected: File = event.target.files[0];
  //   //console.log(this.file);
  //   console.log(fid);
  //   this.foodService.uploadFile(fileSelected,fid)
  //  .subscribe( (response) => {
  //     console.log('set any success actions...');
  //     return response;
  //   },
  //    (error) => {
  //      console.log('set any error actions...');
  //    });
	// 	// this.file = JSON.parse(event.serverResponse._body).filename;
  }

}
