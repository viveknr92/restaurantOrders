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
  name: string;
  type: string;
  price: number;
  availability: string;
  fid: string;
  // modalRef: BsModalRef;

  fileSelected: File;

  public newinfo = {
    menu_id:String,
    message:String
  };

  public food = {
    success: Boolean,
    menu: {},
    message: String
  };

  constructor(private foodService: FoodService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.fid = params['id'];
      console.log(this.fid);
      this.foodService.getAvailableFood(this.fid).subscribe(info => {
        this.food = info;
        //  console.log(this.food);
        // this.foodService.fetchImage(this.food.item_image).subscribe(data => {
        //   let reader = new FileReader();
        //   reader.addEventListener("load", () => {
        //     this.image = reader.result;
        //   }, false);

        //   if (data) {
        //     reader.readAsDataURL(data);
        //   }
        // }, error => {
        //   console.log(error);
        // });
      })
    });
  }

  editItem(e) {
    e.preventDefault();
    this.foodService.editItem(this.food.menu).subscribe(info => {
      // if(info.success == true){
      this.flashMessages.show("Successfully Updated Item ", { cssClass: "alert-success", timeout: 2000 });
      this.router.navigate(['/menu']);
      // }else{
      // this.flashMessages.show("Something went wrong",{cssClass : "alert-danger", timeout: 2000});
      // }
      // this.foodService.uploadFile(this.fileSelected,this.newinfo.menu_id)
      // .subscribe( (response) => {
      //    console.log('IMAGE UPLOADED TO DATABASE');
      //    return response;
      //  },
      //   (error) => {
      //     console.log('FAILED TO UPLOAD IMAGE TO DB');
      //   });
        
      
    })
  }

  ImmediateUpload(event, fid) {
    console.log(fid);
    console.log("FILE UPLOAD SUCCESSFUL");
    this.fileSelected = event.target.files[0];
    this.foodService.uploadFile(this.fileSelected,fid)
   .subscribe( (response) => {
      console.log('IMAGE UPLOADED TO DATABASE');
      return response;
    },
     (error) => {
       console.log('FAILED TO UPLOAD IMAGE TO DB');
     });
  }
}
