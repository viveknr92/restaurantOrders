import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [AuthService ]
})
export class RegisterComponent implements OnInit {
  user_name:string;
  password:string;
  mail_id:string;
  role:string;
  confirm_password:string;
  

  constructor(
    private authService : AuthService,
    private route : Router,
    private flashMessage : FlashMessagesService,
  ) { }

  ngOnInit() {
    this.role="user";
  }
  
  comparePassword(){
    if (this.confirm_password === this.password){
      return true;
    }
    else{
      return false;
    }
  }
  onSubmit() {
    const userInfo={
      user_name:this.user_name,
      password:this.password,
      mail_id:this.mail_id,
      role:this.role
    }
    console.log(userInfo);
    this.authService.registerUser(userInfo)
    .subscribe(
      res => {
        if(res){   //is this condition fine to check??
         localStorage.setItem("token", res.token);
         this.flashMessage.show("You are now registered", {cssClass : 'alert-success', timeout : 4000})
         this.route.navigate(['login']);
        }},
      err => console.log(err)
      
    )  
  }
}