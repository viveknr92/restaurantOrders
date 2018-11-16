import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service'
import { Menu } from '../../models/menu'
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  image: any;
  food: Menu;
  name: string;
  type: string;
  price: number;
  fid: string;
  // modalRef: BsModalRef;


  constructor(private foodService: FoodService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.food = {
      _id: null,
      item_name: null,
      item_cost: null,
      item_type: null,
      item_availability: null,
      item_image: null
    };
    this.route.params.subscribe(params => {
      console.log(params['_id']);
      this.fid = params['_id'];
      this.foodService.getAvailableFood(localStorage.getItem("fid")).subscribe(info => {
        // this.food = info.menu;
      //   this.foodService.fetchImage(info.food.image).subscribe(data => {
      //     let reader = new FileReader();
      //     reader.addEventListener("load", () => {
      //       this.image = reader.result;
      //     }, false);

      //     if (data) {
      //       reader.readAsDataURL(data);
      //     }
      //   }, error => {
      //     console.log(error);
      //   });
      })
    });
  }

  editItem(e){
    e.preventDefault();
    this.food.item_name = this.name;
    this.food.item_type = this.type;
    this.food.item_cost = this.price;
    this.food.item_availability = "Y";
    this.foodService.editItem(localStorage.getItem("fid")).subscribe(info=>{
      // if(info.success == true){
        this.flashMessages.show("Successfully Updated Item ",{cssClass : "alert-success", timeout: 2000});
        this.router.navigate(['/menu']);		
      // }else{
        // this.flashMessages.show("Something went wrong",{cssClass : "alert-danger", timeout: 2000});
      // }
    })		
  }

}
